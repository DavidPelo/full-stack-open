import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only blog title and blog author by default', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 1337,
    url: 'test url',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('test title')
  expect(div).toHaveTextContent('test author')
  expect(div).not.toHaveTextContent('1337')
  expect(div).not.toHaveTextContent('test url')
})

test('clicking view button displays blog url and likes', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 1337,
    url: 'test url',
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const button = container.querySelector('.detailsButton')

  await user.click(button)

  const blogDiv = container.querySelector('.blog')
  const blogDetailsDiv = container.querySelector('.blogDetails')
  const blogUrl = container.querySelector('.blogUrl')
  const blogLikes = container.querySelector('.blogLikes')

  expect(blogDiv).toBeDefined()
  expect(blogDetailsDiv).toBeDefined()
  expect(blogUrl).toBeDefined()
  expect(blogLikes).toBeDefined()

  expect(blogDiv).toHaveTextContent('test title')
  expect(blogDiv).toHaveTextContent('test author')
  expect(blogLikes).toHaveTextContent('likes 1337')
  expect(blogUrl).toHaveTextContent('test url')
})

test('Like event handler is called as many times as the button is clicked', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 1337,
    url: 'test url',
    user: {
      id: '1234'
    }
  }

  const testUser = {
    username: 'dpelo',
    password: '1234',
    id: '1234'
  }

  const clicks = 2

  const likeHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} addLike={likeHandler} user={testUser} />
  )

  const user = userEvent.setup()

  const detailsButton = container.querySelector('.detailsButton')
  await user.click(detailsButton)

  const likeButton = container.querySelector('.likeButton')

  for (let i = 0; i < clicks; i++)
    await user.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(clicks)
})
