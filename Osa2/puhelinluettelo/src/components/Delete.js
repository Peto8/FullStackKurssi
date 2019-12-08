import personsService from '../services/Persons'


//Handles the addition of a new person data
//Returns the forms that allow the addition of name and phone-number
const Delete_person = (person, persons, setPersons, showNote) => {
    let new_persons = []
    if (window.confirm(`Delete ${person.name}?`)) { 
        new_persons = persons.filter(function(p) {
             return p.id !== person.id
            })
        personsService
            .remove(person.id)
            .then(
                setPersons(new_persons), 
                showNote(`Deleted ${person.name}`, false),  
            )
    }
}

export default Delete_person
