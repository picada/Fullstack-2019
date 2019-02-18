const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favorite blog', () => {

  test('when list has only one blog it is returned', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    console.log(result)
    expect(result).toEqual(helper.listWithOneBlog[0])
  })

  test('of many is calculated right', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result).toEqual(helper.initialBlogs[2])
  })
})
