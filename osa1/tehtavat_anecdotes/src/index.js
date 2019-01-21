import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))


  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length) + 0  )
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const findMostVoted = (anecdotes, votes) => {
    let max = 0
    let highest = anecdotes[0]
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > max) {
        max = votes[i]
        highest = anecdotes[i]
      }
    }
  return {max, highest}
}

const mostVoted = findMostVoted(anecdotes, votes)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={nextAnecdote} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <p>{mostVoted.highest}</p>
      <p>Has {mostVoted.max} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
