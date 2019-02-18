const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  let max = blogs[0].likes
  for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].likes > max) {
        favorite = blogs[i]
        max = blogs[i].likes
      }
    }
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
