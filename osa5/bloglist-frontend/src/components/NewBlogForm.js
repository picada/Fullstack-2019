import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm= ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input value={newTitle} onChange={handleTitleChange}/>
      </div>
      <div>
        Author: <input value={newAuthor} onChange={handleAuthorChange}/>
      </div>
      <div>
        Url: <input value={newUrl} onChange={handleUrlChange}/>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}

export default NewBlogForm
