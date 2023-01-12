import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const newBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
  }

  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('blog title...')
  const authorInput = screen.getByPlaceholderText('blog author...')
  const urlInput = screen.getByPlaceholderText('blog url...')
  const submitButton = screen.getByText('save')

  const user = userEvent.setup()
  await user.type(titleInput, newBlog.title )
  await user.type(authorInput, newBlog.author )
  await user.type(urlInput, newBlog.url )
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
})