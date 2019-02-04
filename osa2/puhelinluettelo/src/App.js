import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Persons = ({personsToShow, remove}) =>
  personsToShow.map(p =>
    <li key={p.name}>
      {p.name} {p.number}
      <button onClick={() => remove(p)}>Poista</button>
    </li>
)

const NewPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        nimi: <input value={props.newName} onChange={props.handlePersonChange}/>
      </div>
      <div>
        numero: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const FilterForm = (props) => {
  return (
    <form>
      <div>
        rajaa näytettäviä: <input value={props.filter} onChange={props.handleFilterChange}/>
      </div>
    </form>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === nameObject.name)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      personService
        .create(nameObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Lisää uusi</h3>
      <NewPersonForm addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
        <ul>
          <Persons personsToShow={personsToShow} remove={removePerson}/>
        </ul>
    </div>
  )

}

export default App
