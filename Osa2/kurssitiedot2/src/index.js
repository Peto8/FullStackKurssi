import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'


//Key handeled with .name+index
const Courses = (props) => {
  let arry = props.courses.map(function (obj, i){
    return <Course key={obj.name+i} course={obj}/>
  })
  return <div>{arry}</div>
}

//App
//  Courses
//    course
//    course..
//      Header
//      Content 
//        Part  
//        Part...
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Curriculum</h1>
      <Courses courses={courses}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))