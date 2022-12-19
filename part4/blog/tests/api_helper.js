const Blog = require('../models/blog')
const User = require('../models/user')

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

module.exports = {
  blogsInDb,
  usersInDb,
  nonExistingId,
}
