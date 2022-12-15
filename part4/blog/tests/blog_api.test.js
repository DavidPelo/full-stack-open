const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./api_helper')
const data = require('./testData')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = data.blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

test('all blogs can be retrieved as JSON', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(data.blogs.length)
})

test('blog objects have an "id" property', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blog objects do not have an "_id" property', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog._id).not.toBeDefined())
})

test('blogs can be posted to the api in the correct format', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'David Pelo',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 1337,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(data.blogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain('Test Blog')
})

test('"likes" property should default to 0', async () => {
  const newBlogWithMissingLikes = {
    title: 'Likes Default Test',
    author: 'David Pelo',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithMissingLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('server responds 400 bad request if title or url properties are missing', async () => {
  const malformedBlogObject = [
    {
      author: 'David Pelo',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 1337,
    },
    {
      title: 'Test Blog',
      author: 'David Pelo',
      likes: 1337,
    },
    {
      author: 'David Pelo',
      likes: 1337,
    },
  ]

  malformedBlogObject.forEach(async blog => {
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
