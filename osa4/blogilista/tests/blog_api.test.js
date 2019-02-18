const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('identification field is called id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(object => {
    expect(object.id).toBeDefined()
  })
})

test('there are six notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    content: 'Test blog',
    author: 'Test author',
    url: 'www.testurl.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.blogsInDb()
  expect(notesAtEnd.length).toBe(helper.initialBlogs.length + 1)
})

test('set likes to 0 if not defined', async () => {
  const blogObject = new Blog({
    title: "Diudiu",
    author: "Anonymous",
    url: "www.diu.com",
    likes: null,
  })

  await api.post('/api/blogs').send(blogObject).expect(201)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[6].likes).toBe(0)
})

test('fails with statuscode 400 if title is missing', async () => {
  const blogObject = new Blog({
    title: null,
    author: "Anonymous",
    url: "www.diu.com",
    likes: 0,
  })

  await api.post('/api/blogs').send(blogObject).expect(400)
})

test('fails with statuscode 400 if url is missing', async () => {
  const blogObject = new Blog({
    title: "Diudiu",
    author: "Anonymous",
    url: null,
    likes: 0,
  })

  await api.post('/api/blogs').send(blogObject).expect(400)
})

describe('when there is initially one user at db', async () => {
  beforeEach(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

test('test username length', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = ({
    username: "Aa",
    user: "Alli Autuas",
    password: "salasana"
  })
  await api.post('/api/users').send(newUser).expect(400)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('test password length', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = ({
    username: "Aaaaa",
    user: "Alli Autuas",
    password: "sa"
  })
  await api.post('/api/users').send(newUser).expect(400)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})
