import React from 'react'
import ReactDOM from 'react-dom'



const Header = (props) =>{
    return(
        <h1>{props.course}</h1>
    )
}

const Part = (props) =>{
    return(
        <p>{props.content.name} {props.content.exercises}</p>
    )
}

const Content =(props) =>{
    return (
        <div>
          <Part content = {props.parts[0]}/>
          <Part content = {props.parts[1]}/>
          <Part content = {props.parts[2]}/>

        </div>
      )
}

const Total =(props) =>{
    let sum = 0;
    for (let num of props.parts){   
        sum = sum + num.exercises
    }
    return (
        <p>Number of exercises props {sum}</p>
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
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))