import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [description, setDescription] = useState(blog.title + ' by ' + blog.author)
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = () => {
    if (!showDetails) {
      setShowDetails(true)
      setDescription(
        <div>
          <div>{blog.title} by {blog.author}</div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {likes} likes <button onClick={() => like()}>Like</button>
          </div>
          <div>Added by {blog.user.name}</div>
          <div>
            <button onClick={console.log('clicked')}>Remove</button>
          </div>
        </div>
      )
    } else {
      setShowDetails(false)
      setDescription(
        <div>
          {blog.title} by {blog.author}
        </div>
      )
    }
  }

  const like = () => {
    blog.likes += 1
    setLikes(blog.likes)
    blogService.put(blog)
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleDetails()}>
        {description}
      </div>
    </div>
  )
}

export default Blog
