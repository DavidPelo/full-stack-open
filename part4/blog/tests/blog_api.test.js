const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./api_helper')
const data = require('./testData')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(data.blogs)
})

describe('when there are some blogs already saved', () => {
  test('all blogs can be retrieved as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(data.blogs.length)
  })

  test('a specific blog exists in the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('blog objects are formed correctly', () => {
  test('blog objects have an "id" property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test('blog objects do not have an "_id" property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog._id).not.toBeDefined())
  })
})

describe('adding a new blog', () => {
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

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Test Blog')
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
      await api.post('/api/blogs').send(blog).expect(400)
    })
  })
})

describe('adding a new blog with no likes property', () => {
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
})

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(data.blogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('blog object can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const initialLikes = blogToUpdate.likes

    const updatedTitle = 'React patterns updated'
    blogToUpdate.title = updatedTitle
    blogToUpdate.likes = blogToUpdate.likes + 1 || 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(data.blogs.length)

    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    expect(updatedBlog.title).toBe(updatedTitle)
    expect(updatedBlog.likes).toBe(initialLikes + 1)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    const blog = {
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 0,
    }

    await api.put(`/api/blogs/${validNonexistingId}`).send(blog).expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
