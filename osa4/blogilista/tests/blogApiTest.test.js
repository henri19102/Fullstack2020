const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "second post",
    "author": "jaska",
    "url": "www.google.fi",
    "likes": 5,
    },
    {
    "title": "third post",
    "author": "gggg",
    "url": "www.google.fi",
    "likes": 0,
    }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(response.body.length)
})

test('the first blogs title is second post', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('second post')
})

test('the identifying field is id and not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})



test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "fourth post",
    author: "simo",
    url: "www.google.fi",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(3)
  expect(titles).toContain(
    'fourth post'
  )
})

test('invalid blog is not added ', async () => {
  const newBlog = {
    author: "sihvonen",
    likes: 11
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})