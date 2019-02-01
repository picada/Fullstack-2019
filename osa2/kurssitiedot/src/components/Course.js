import React from 'react'

const Header = props =>
  <h2>{props.course}</h2>

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}

const Content = ({ parts }) => (
    parts.map(parts => <p key={parts.id}>{parts.name} {parts.exercises}</p>)
  )

  const Course = ({ course }) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

  export default Course
