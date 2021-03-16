import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Content = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ sum }) => {
  return (
    <p>
      Number of excercises {sum}
    </p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (

    <div>
      <Header name={course.name} />
      <Content name={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Content name={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Content name={course.parts[2].name} exercises={course.parts[2].exercises} />
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
