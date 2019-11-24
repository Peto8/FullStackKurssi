import React, { useState } from 'react'
import ReactDOM from 'react-dom'




const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>
)

const Statistics = (props) => {
    let all = props.values[0] + props.values[1] + props.values[2]
    let average = (props.values[0]-props.values[2])/all
    let positive = (props.values[0]/all)*100

    if (all === 0){
        return <p>No feedback given</p>
    }

    return(
    
    <div>
        <table>
            <tbody>
            <Statistic text="good" value={props.values[0]}/>
            <Statistic text="neutral" value={props.values[1]}/>
            <Statistic text="bad" value={props.values[2]}/>
            <Statistic text="all" value={all}/>
            <Statistic text="average" value={average}/>
            <Statistic text="positive" value={positive}/>
            </tbody>
        </table>
    </div>
    )
}




const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good +1)} text="good" />
        <Button handleClick={() => setNeutral(neutral +1)} text="neutral" />
        <Button handleClick={() => setBad(bad +1)} text="bad" />
        <h1>statistics</h1>
        <Statistics values={[good,neutral,bad]}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)