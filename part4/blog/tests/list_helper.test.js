const listHelper = require('../utils/list_helper')
const data = require('./testData')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has no blogs, total likes should be 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(data.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, total likes is the sum of all blog likes summed', () => {
    const result = listHelper.totalLikes(data.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list has no blogs, null should be returned', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('when list has only one blog, favorite blog should be that one', () => {
    expect(listHelper.favoriteBlog(data.listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has many blogs, the blog with the most likes should be returned', () => {
    const result = listHelper.favoriteBlog(data.blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('when list has no blogs, null should be returned', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('when list has only one blog, that author should be returned with 1 blog', () => {
    expect(listHelper.mostBlogs(data.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has many blogs, the author with the most blogs should be returned', () => {
    expect(listHelper.mostBlogs(data.blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('when list has no blogs, null should be returned', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('when list has only one blog, that author and their blog\'s likes should be returned', () => {
    expect(listHelper.mostLikes(data.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs, the author with the most total blog likes should be returned', () => {
    expect(listHelper.mostLikes(data.blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
