import React from 'react'


const Info = (props) => (
  <tr>
    <td>{props.person.name}</td>
    <td>{props.person.number}</td>
    <td><button type="button" onClick={() => props.deleting(props.person)}>delete</button></td>
  </tr>
)

// props.showChosenCountry(country)


//Handles all person data
//Returns all or filtered person data
const PersonsData = (props) => {

    //Filter if required
    var filtered_people = props.persons

    if(props.filter !== ''){
        filtered_people = props.persons.filter(function(person) {
        return person.name.toLocaleLowerCase().includes(props.filter.toLocaleLowerCase())})
      }
    return (
      <table>
        <tbody>
          {filtered_people.map(individual => 
          <Info key={individual.name} person={individual} deleting={props.deleting}/>)}
        </tbody>
      </table>
    )
      
  }

export default PersonsData
