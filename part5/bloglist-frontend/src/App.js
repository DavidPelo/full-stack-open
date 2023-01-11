import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const useBlogRef = useRef()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    setNotification({
      message: message,
      type: type,
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Log in successful', 'success')
    } catch (exception) {
      console.log(exception)
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
    showNotification('Logout successful', 'success')
  }

  const addBlog = async blogObject => {
    useBlogRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)

      console.log(newBlog)
      
      setBlogs(blogs.concat(newBlog))
      showNotification(`Added ${newBlog.title} by ${newBlog.author}`, 'success')
    } catch (exception) {
      showNotification(`${exception.response.data.error}`, 'error')
    }
  }

  const addLike = async blogObject => {
    const id = blogObject.id

    blogObject.likes += 1

    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(b => (b.id !== id ? b : updatedBlog)))
    } catch (exception) {
      showNotification(`${exception.response.data.error}`, 'error')
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      showNotification(`Blog removed successfully`, 'success')
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      console.log(error)
      showNotification('Blog has already been deleted from the server', 'error')
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={useBlogRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      {user ? (
        <div>
          <span>logged-in as {user.name}</span>
          <button type='button' onClick={handleLogout}>
            logout
          </button>
          {blogForm()}
        </div>
      ) : (
        loginForm()
      )}

      {blogs
        .sort((blogA, blogZ) => blogZ.likes - blogA.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            user={user}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  )
}

export default App
