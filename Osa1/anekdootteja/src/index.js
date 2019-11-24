import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

//Creates random integer from 0 to "max" OTHER than alredy selected one
//Making sure you woun't pick the same value twice
const Random = (max, selected) =>{
  let rand = Math.floor(Math.random()*(max+1))
  while(rand === selected){
    rand = Math.floor(Math.random()*(max+1))
  }
  return(rand)
}

const AddVote = (s) =>{
  voteObj.votes[s] += 1
  //to re-render
  //The "app" is needed to call with the anecdotes for it to have it in props
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
}

const MostVotes = (props) => {
  let largest = 1;
  let index = -1;
  voteObj.votes.forEach(function (value, i) {
    if(value >= largest) {
      index = i; largest = value
    }
  })
  if(index === -1) return <p></p>//if no votes are cast

  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>Winner with {voteObj.votes[index]} votes</p>
    </div>
  )
}


// Should work with any amount of anecdotes :)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  MostVotes()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      <p>has {voteObj.votes[selected]} votes</p>
      <Button handleClick={() => AddVote(selected)} text="vote" />
      <Button handleClick={() => setSelected(Random(anecdotes.length-1, selected))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MostVotes />
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

//Needs to be constructed AFTER anecdotes
const voteObj = {
  votes : new Array(anecdotes.length).fill(0)  
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
