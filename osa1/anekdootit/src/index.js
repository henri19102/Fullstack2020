import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ random }) => <button onClick={random}>next anecdote</button>
const ButtonV = ({ vote }) => <button onClick={vote}>vote</button>

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const randomLuku = () => setSelected(Math.floor(Math.random() * 6))
  const addVote = () => {
    votes[selected] += 1
    setVotes(votes)
  }

  let y = 0

  votes.forEach(value => {
    if (value >= y) {
      y = value
    }
  })

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes[selected]}
      <p>This anecdote has {votes[selected]} points</p>
      <div>
        <Button random={randomLuku} />
        <ButtonV vote={addVote} />
        <h2>Anecdote with most votes: </h2>
        <p>{anecdotes[votes.indexOf(y)]}</p>
      </div>
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
  <App />,
  document.getElementById('root')
)
