import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ click, text }) => <button onClick={click}> {text} </button>

const StatisticLine = ({ text, value, text2 }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text} </td>
          <td>{value}{text2}</td>
        </tr>
      </tbody>
    </table>
  )
}
const Statistics = (props) => {
  if (props.all === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good " value={props.good} />
      <StatisticLine text="neutral " value={props.neutral} />
      <StatisticLine text="bad " value={props.bad} />
      <StatisticLine text="all " value={props.all} />
      <StatisticLine text="average " value={props.average} />
      <StatisticLine text="positive " value={props.positive} text2="%" />
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodPlusOne = () => {
    setGood(good + 1)
    setAll(all + 1)

  }
  const neutralPlusOne = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)

  }
  const badPlusOne = () => {
    setBad(bad + 1)
    setAll(all + 1)

  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button click={goodPlusOne} text="good" />
      <Button click={neutralPlusOne} text="neutral" />
      <Button click={badPlusOne} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={(good - bad) / all}
        positive={good / all * 100}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
