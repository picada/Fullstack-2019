import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import Filter from './components/Filter'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.notification !== null && <Notification />}
      <Filter/>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
