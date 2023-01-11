import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, removeBlog }) => {
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

  const showRemoveButton =
    user && (user.id === blog.user.id || user.id === blog.user)

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
          {showRemoveButton && (
            <button type='button' onClick={removeHandler}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
