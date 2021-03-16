import React from 'react'

const PersonForm = ({addName, newName, newNumber, handleNumberChange, handlePersonChange}) => {
    return (
        <div>
          <form onSubmit={addName}>
            <div>name: <input value={newName} onChange={handlePersonChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
        </div>

    )
}

export default PersonForm