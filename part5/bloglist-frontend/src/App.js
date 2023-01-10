import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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

  const addBlog = e => {
    e.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        showNotification(
          `Added ${newBlog.title} by ${newBlog.author}`,
          'success'
        )
      })
      .catch(exception => {
        showNotification(`${exception.response.data.error}`, 'error')
      })
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
    <form onSubmit={addBlog}>
      <label htmlFor='title'>title</label>
      <input
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label htmlFor='author'>author</label>
      <input
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <label htmlFor='url'>url</label>
      <input
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type='submit'>save</button>
    </form>
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

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
