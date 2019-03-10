import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.voteAnecdote(id)
    props.notificationChange(`You voted '${content}'`, 10)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notificationChange
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
