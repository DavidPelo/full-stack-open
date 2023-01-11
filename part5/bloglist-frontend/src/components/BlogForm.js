import React, { useState } from 'react'

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
}

export default BlogForm