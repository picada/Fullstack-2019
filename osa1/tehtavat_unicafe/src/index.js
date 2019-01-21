import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const total = good+bad+neutral
  if (total === 0) {
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }
  const average = (good+bad*(-1))/total
  const positive = good/total*100
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="hyvä" value={good}/>
          <Statistic text="neutraali" value={neutral}/>
          <Statistic text="huono" value={bad}/>
          <Statistic text="yhteensä" value={total}/>
          <Statistic text="keskiarvo" value={average}/>
          <Statistic text="positiivisia" value={positive + " %"}/>
        </tbody>
      </table>
    </div>
  )
}

const Display = props => <div>{props.value}</div>

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const total = good+neutral+bad

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={handleGoodClick} text='hyvä' />
      <Button handleClick={handleNeutralClick} text='neutraali' />
      <Button handleClick={handleBadClick} text='huono' />
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
