import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ countriesToShow }) => {
  if (countriesToShow.length ===1) {
    return (
      <SingleCountry country={countriesToShow[0]}/>
    )
  }
  else if (countriesToShow.length <= 10) {
    return (
      <Countries countriesToShow={countriesToShow}/>
    )
  }
  else {
    return (
      <li>Too many matches, specify another filter</li>
    )
  }
}

const SingleCountry = ({ country }) => {
  const flagAlt = "The flag of " + country.name
  return (
      <div>
      <h2>{country.name}</h2>
      <p>
      capital: {country.capital} <br/>
      population: {country.population}
      </p>
      <h3>Languages</h3>
      <ul>
        <Languages languages={country.languages}/>
      </ul>
      <br/>
      <h3>Flag</h3>
      <img src={country.flag} alt={flagAlt} height="10%" width="10%" />
      </div>
  )
}

const ListCountry = ({ country }) => {
  return (
    <li>{country.name}</li>
  )
}

const Countries = ({countriesToShow}) =>
  countriesToShow.map(country =>
    <ListCountry
      key={country.name}
      country={country}
    />
)

const Language= ({ language }) => {
  return (
    <li>{language.name}</li>
  )
}

const Languages = ({ languages }) =>
  languages.map(language =>
    <Language
      key={language.name}
      language={language}
    />
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow =
    countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries: <input value={filter} onChange={handleFilterChange}/>
        </div>
      </form>
      <ul>
          <Display countriesToShow={countriesToShow}/>
      </ul>
    </div>
  )
}

export default App
