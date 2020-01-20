import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/peopleService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  // Fetch data from json-server
  useEffect(() => {
    peopleService.getAll()
      .then(objects => setPersons(objects))
    // axios.get('http://localhost:3001/persons')
    //     .then(response => {
    //       setPersons(response.data)
    //     })
  }, [])

  // onChange event handler
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // onSubmit event handler
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name === newName) != null) {

      alert(`${newName} is already added to phonebook!`)

    } else {

      const person = {
        name: newName,
        number: newNumber
      }

      peopleService.create(person)
        .then(newPerson => setPersons(persons.concat(newPerson)))

      // axios.post('http://localhost:3001/persons', person) 
      //     .then(setPersons(persons.concat(person)))

    }

    setNewName('')
    setNewNumber('')
  }

  // filter onChange event handler
  const handleFilter = (event) => {
    setSearch(event.target.value)
    setResults(persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  // DELETE button handler
  const deletingHandler = (id) => {
    const deleting = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${deleting.name}?`)) {
      peopleService.deletePerson(id)
      setPersons(persons.filter(p => p.id !== id))
    }


  }

  return (
    <div>
      <h2>Phonebook</h2>

      filter shown with: <Filter search={search} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons results={results} persons={persons} search={search} deletingHandler={deletingHandler} />
    </div>
  )
}

export default App