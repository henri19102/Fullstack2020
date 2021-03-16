const listHelper = require('../utils/list_helper')

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
const test1 = {
author: "Robert C. Martin",
blogs: 3
}
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
  "likes": 6,
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
  "likes": 1,
  "id": "5f9b171ca469ae056ca9981f"
  }
  ]
const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
  ]
const emptyBlog = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () =>{
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(23)
    })
  })

describe('most likes or most blogs', () => {
    test('returns blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[1])
    })
    test('returns author with most blogs', () => {
      const result = listHelper.mostBlogs(blogs2)
      expect(result).toEqual(test1)
  })
})