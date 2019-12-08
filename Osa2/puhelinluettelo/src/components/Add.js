import React from 'react'
import personsService from '../services/Persons'


//Handles the addition and editing of person data
//Returns the forms that allow the addition of name and phone-number
const Add = (props) => {
    
    const addPerson = (event) =>{
        event.preventDefault() //otherwise reloads
        let name_exists = false
        let edited_person

        let new_persons = props.persons.map(person => {
            if(person.name === props.name){ 
                name_exists=true
                edited_person = Object.assign({}, person)
                edited_person.number = props.number
                return edited_person
            }else return person
        })

        //Editing persons number
        if(name_exists){
            if (window.confirm(`${props.name} is alredy added to phonebook,
            replace the old number with a new one?`)) { 
                personsService
                    .edit(edited_person.id, edited_person)
                    .then(
                        props.setPersons(new_persons), 
                        props.setNewName(''),
                        props.setNewNumber(''),  
                        props.showNote(`${props.name} number changed to ${edited_person.number}`, false),
                    ).catch(error => {
                        props.showNote(`Person ${props.name} has alredy been removed from the server`, true)
                        props.setPersons(new_persons.filter(p => p.id !== edited_person.id))
                      })
                return
            }else return

        }

        const personObject = {
            name: props.name,
            number: props.number,}

        personsService
            .add(personObject)
            .then(response =>
                props.setPersons(props.persons.concat(response.data)),
                props.setNewName(''),
                props.setNewNumber(''),
                props.showNote(`Added ${props.name}`, false),         
            )
    }

    
    return(
    <form onSubmit={addPerson}>
        <div>name: <input value={props.name} onChange={props.handleName}/></div>
        <div>number: <input value={props.number} onChange={props.handleNumber}/></div>
        <div><button type="submit">add</button>
        </div>
    </form>
)}

export default Add
