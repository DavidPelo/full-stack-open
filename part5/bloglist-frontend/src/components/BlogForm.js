import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className='blogForm'>
      <label htmlFor='title'>title</label>
      <input
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder='blog title...'
      />
      <br />
      <label htmlFor='author'>author</label>
      <input
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        placeholder='blog author...'
      />
      <br />
      <label htmlFor='url'>url</label>
      <input
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        placeholder='blog url...'
      />
      <br />
      <button type='submit'>save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
