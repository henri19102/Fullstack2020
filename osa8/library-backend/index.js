const config = require("./config");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require("apollo-server");
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const JWT_SECRET = 'KEY'
console.log("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      name: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(name: String!, born: Int, bookCount: Int): Author
    editAuthor(name: String, born: Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books2 = await Book.find({}).populate('author')
      if (args.genre) {
        return books2.filter((x) => x.genres.find((x) => x === args.genre) === args.genre);
      }
      return books2
    },
    allAuthors: (root, args) => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  
  Author: {
    bookCount: async (root) => {
      let authorsBooks = await Book.find({ author: { $all: root.id } });
      return authorsBooks.length;
    },
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      await author.save();
      return author;
    },

    addBook: async (root, args, context) => {
      let author1 = await Author.findOne({ name: args.name }).exec();
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (author1 === null) {
        author1 = new Author({ name: args.name });
        try {
          await author1.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      let book = new Book({ ...args, author: author1 })
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', {bookAdded: book})
      return book;
    },


    editAuthor: async (root, args, context) => {
      let author2 = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (author2 === null) {
        return null;
      }
      author2.born = args.born;
      await author2.save();
      return author2;
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== '1234' ) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
});
