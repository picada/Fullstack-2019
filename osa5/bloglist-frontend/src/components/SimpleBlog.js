import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='blogAsText'>
      {blog.title} {blog.author}
    </div>
    <div className='lie'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
