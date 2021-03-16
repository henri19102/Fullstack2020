import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('Add name...')
    const [newNumber, setNewNumber] = useState('Add number...')
    const [nameFilter, setNameFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService.getAll()
            .then(initialPersons => { setPersons(initialPersons) })
    }, [])

    const addName = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
            setErrorMessage(`${newName} is already added to phonebook`)
            setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
        } else {
            const nameObject = {
                name: newName, number: newNumber
            }
            personService.create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName("")
                    setNewNumber('')
                })
                setErrorMessage(`${newName} added to phonebook`)
            setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
        }
    }

    const deleteName = (e) => {
        e.preventDefault()
        let idd = e.target.id
            personService.dName(idd)
                .then(deletedPerson => deletedPerson)
            personService.getAll()
                .then(initialPersonsss => { setPersons(initialPersonsss) })
                setErrorMessage(`Succesfully deleted`)
            setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleNameFilter = (event) => {
        setNameFilter(event.target.value)
    }

    return (
        <div>
            <Notification message={errorMessage}/>
            <h1>Phonebook</h1>
            <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
            <h2>add a new</h2>
            <PersonForm newName={newName} newNumber={newNumber} addName={addName}
                handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} nameFilter={nameFilter} deleteName={deleteName} />
        </div>
    )
}

export default App