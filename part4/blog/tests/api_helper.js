const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'test',
    url: 'test',
    likes: 0,
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const createUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('testpass', 10)
  const user = new User({ username: 'testuser', passwordHash })

  return await user.save()
}

const createToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return jwt.sign(userForToken, process.env.SECRET)
}


module.exports = {
  blogsInDb,
  usersInDb,
  nonExistingId,
  createUser,
  createToken
}
