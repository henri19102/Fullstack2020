let _ = require('lodash');
const { count } = require('../models/blog');

const blogs = [
    {
    "title": "Moi",
    "author": "henri",
    "url": "fwefw",
    "likes": 5,
    "id": "5f97e99be8126122945b9b3e"
    },
    {
    "title": "first post",
    "author": "jaakko",
    "url": "www.google.fi",
    "likes": 3,
    "id": "5f97f58caf7e66274826cd1d"
    },
    {
    "author": "jaakko",
    "url": "www.google.fi",
    "likes": 3,
    "id": "5f97f5c3af7e66274826cd1e"
    },
    {
    "author": "jaakko",
    "url": "www.google.fi",
    "likes": 3,
    "id": "5f97f5c8af7e66274826cd1f"
    },
    {
    "title": "second post",
    "author": "jaska",
    "url": "www.google.fi",
    "likes": 5,
    "id": "5f9b11d1875d591cf0546c3b"
    },
    {
    "title": "third post",
    "author": "gggg",
    "url": "www.google.fi",
    "likes": 6,
    "id": "5f9b171ca469ae056ca9981f"
    }
    ]
    const blogs2 = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  
    ]

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    return  blogs.reduce((x,y)=>x+y.likes,0)
}

const favoriteBlog = (blogs) => {
    let fav = blogs.reduce((prev, curr) => 
    (prev.likes > curr.likes ? prev : curr), 0
    )
    return fav
}

const mostBlogs = (blogs) => {
  let auths = blogs.map(x => x.author).sort()
  let grouped = _.groupBy(auths)
  let most = Object.entries(grouped).reduce((prev, curr) => 
  (prev[1].length > curr[1].length ? prev : curr)
  )
  
  let most2 = {author: most[0], blogs: most[1].length}
  return most2
}


console.log(mostLikes(blogs2))

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }