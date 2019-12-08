import React from 'react'

const Header = (props) =>{
    return(
        <h2>{props.course}</h2>
    )
}

//The key= index+name, making it alot better than just being "index"
const Content =(props) =>{
    let arry = props.parts.map(function (obj, i){
      return <Part key={i+obj.name} content={obj}/>
    })
    return <div>{arry}</div>
  }

const Part = (props) =>{
    return(
        <p>{props.content.name} {props.content.exercises}</p>
    )
}

const Course = (props) =>{
    const total = props.course.parts.reduce((sum, plus) => (
        sum+plus.exercises),0) //the 0 is the initial value

    return(
    <div>
    <Header course={props.course.name}/>
    <Content parts={props.course.parts}/>
    <b>Total of {total} exercises</b>
    </div>
    )
}

export default Course