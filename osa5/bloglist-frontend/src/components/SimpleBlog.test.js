import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Matilla on asiaa',
    author: 'Matti Meikäläinen',
    likes: '3'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.blogAsText')
  expect(div).toHaveTextContent(
    'Matilla on asiaa Matti Meikäläinen'
  )

  const div2 = component.container.querySelector('.likes')
  expect(div2).toHaveTextContent('3')

})

// it('clicking the like button twice calls event handler twice', async () => {
//   const note = {
//     content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
//     important: true
//   }
//
//   const mockHandler = jest.fn()
//
//   const { getByText } = render(
//     <Note note={note} toggleImportance={mockHandler} />
//   )
//
//   const button = getByText('make not important')
//   fireEvent.click(button)
//
//   expect(mockHandler.mock.calls.length).toBe(1)
// })
