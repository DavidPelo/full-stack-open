const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  const favoriteBlog = blogs.reduce((prev, current) =>
    +prev.likes > +current.likes ? prev : current
  )

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const blogCountObj = blogs.reduce((obj, blog) => {
    obj[blog.author] = obj[blog.author] || 0
    obj[blog.author] += 1
    return obj
  }, {})

  const blogCountArr = Object.entries(blogCountObj).map(entry => {
    return {
      author: entry[0],
      blogs: entry[1],
    }
  })

  return blogCountArr.reduce((prev, current) =>
    +prev.likes > +current.likes ? prev : current
  )
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  const likeCountObj = blogs.reduce((obj, blog) => {
    obj[blog.author] = obj[blog.author] || 0
    obj[blog.author] += blog.likes
    return obj
  }, {})

  const likeCountArr = Object.entries(likeCountObj).map(entry => {
    return {
      author: entry[0],
      likes: entry[1],
    }
  })

  return likeCountArr.reduce((prev, current) =>
    +prev.likes > +current.likes ? prev : current
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
