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
    <div style={blogStyle} className='blog' id='blog'>
      {blog.title} {blog.author}
      <button
        type='button'
        className='detailsButton'
        id='details-button'
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div className='.blogDetails' id='blog-details'>
          <p className='blogUrl'>{blog.url}</p>
          <p className='blogLikes'>
            likes {blog.likes}
            {user && (
              <button
                type='button'
                className='likeButton'
                id='like-button'
                onClick={likeHandler}
              >
                like
              </button>
            )}
          </p>
          {showRemoveButton && (
            <button type='button' onClick={removeHandler}>
              remove
            </button>
          )}
        </div>
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
