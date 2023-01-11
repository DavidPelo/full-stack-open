import { useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeHandler = () => {
    addLike(blog)
  }

  const removeHandler = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button type='button' onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            {user && (
              <button type='button' onClick={likeHandler}>
                like
              </button>
            )}
          </p>
          {(user && user.id === blog.user.id) && (
            <button type='button' onClick={removeHandler}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
