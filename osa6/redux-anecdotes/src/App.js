import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  },[])

  return (
    <div>
      {props.notification !== null && <Notification />}
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
