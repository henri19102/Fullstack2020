import React from 'react'

const Persons = ({ persons, nameFilter, deleteName }) => {


    return (
        <div>
       {persons.filter(person => person.name.toLowerCase() .includes(nameFilter.toLowerCase())) .map(person =>
            <form key={person.id}  >
            <p >{person.name} {person.number} </p><button id={person.id} onClick={deleteName}  >Delete</button>
            </form>
        )}
        </div>
    )
}

export default Persons
