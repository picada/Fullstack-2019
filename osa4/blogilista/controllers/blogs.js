const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const token = request.token

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    if (body.title === null | body.title === '' | body.url === null | body.url === '') {
      return response.status(400).send('Bad request')
    }

    const blog = new Blog(body)
    blog.user = decodedToken.id
    console.log(blog.user)

    if (blog.likes === null) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
      next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
      next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
      next(exception)
  }
})

module.exports = blogsRouter
