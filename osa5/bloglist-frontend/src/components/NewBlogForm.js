import React from 'react'

const NewBlogForm= (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        Title: <input value={props.newTitle} onChange={props.handleTitleChange}/>
      </div>
      <div>
        Author: <input value={props.newAuthor} onChange={props.handleAuthorChange}/>
      </div>
      <div>
        Url: <input value={props.newUrl} onChange={props.handleUrlChange}/>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

export default NewBlogForm
