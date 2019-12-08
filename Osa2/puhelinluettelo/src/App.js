import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Delete from './components/Delete'
import PersonsData from './components/PersonsData'
import personsService from './services/Persons'


const NotificationMessage = ({ message }) => {
  const notif_style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: '10',
    marginBottom: '10',
  }
  if (message === null) {
    return null
  }
  //If notif type error, red if not green
  notif_style.color = message[1] ? 'red' : 'green'
  return (
    <div style={notif_style}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification] = useState(null)

  //Get persons data from local server
  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  

  //Deleting a person data
  const deleting = (person) => {
    Delete(person, persons, setPersons, showNote)
  }

  //Display notification message
  const showNote = (message, type_error) =>{
    setNotification([`${message}`, type_error])
    setTimeout(() => {setNotification(null)}, 5000)
  }

  //Handles what happens when writing in the name input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  //Handles what happens when writing in the number input
  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={notification}/>
      <Filter value={newFilter} handleFilter={handleFilterChange}/>     
      <h3>Add new</h3>
      <Add  name={newName} setNewName={setNewName}
            number={newNumber} setNewNumber={setNewNumber}
            persons={persons} setPersons={setPersons}
            handleName={handleNameChange}
            handleNumber={handleNumChange}
            showNote={showNote}
            />
    
      <h2>Numbers</h2>
      <PersonsData filter={newFilter} persons={persons} deleting={deleting}/>
    </div>
  )

}

export default App