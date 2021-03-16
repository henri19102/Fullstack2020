import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author{
      name
      born
      bookCount
      id
    }
    published
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $name: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      name: $name,
      published: $published,
      genres: $genres
    ) {
      title
      author{name}
      published
      genres
    }
  }
`


export const EDIT_BORN = gql`
mutation editBorn($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    born: $born
  ) {
    name
    born
  }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`