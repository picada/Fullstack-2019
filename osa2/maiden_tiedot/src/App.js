import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ countriesToShow, setFilter, weatherData, fetchWeatherData, setWeatherIcon, weatherIcon }) => {
  if (countriesToShow.length ===1) {
    return (
      <SingleCountry
        country={countriesToShow[0]}
        weatherData={weatherData}
        fetchWeatherData={fetchWeatherData}
        setWeatherIcon={setWeatherIcon}
        weatherIcon={weatherIcon}
      />
    )
  }
  else if (countriesToShow.length <= 10) {
    return (
      <Countries countriesToShow={countriesToShow} setFilter={setFilter}/>
    )
  }
  else {
    return (
      <li>Too many matches, specify another filter</li>
    )
  }
}

const SingleCountry = ({ country, weatherData, fetchWeatherData, setWeatherIcon, weatherIcon }) => {
  const flagAlt = "The flag of " + country.name
  fetchWeatherData(country)
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
      <img src={country.flag} alt={flagAlt} height="15%" width="15%" />
      <h2>Weather in {country.capital}</h2>
      <p><strong>Tempature: </strong>{weatherData.temp_c} celsius</p>
      <img src={weatherIcon} alt="weather_icon"  />
      <p><strong>Wind: </strong>{weatherData.wind_kph} kph direction {weatherData.wind_dir}</p>
      </div>
  )
}

const ListCountry = ({ country, setFilter }) => {
  return (
    <li>{country.name} <ShowButton country={country} setFilter={setFilter} /> </li>
  )
}

const Countries = ({countriesToShow, setFilter}) =>
  countriesToShow.map(country =>
    <ListCountry
      key={country.name}
      country={country}
      setFilter={setFilter}
    />
)

const ShowButton = ({ country, setFilter }) => {
    const handleClick = () => {
        setFilter(country.name.toLowerCase())
    }
    return (
        <button onClick={handleClick}>Show</button>
    )
}


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
  const [weatherData, setWeatherData] = useState([])
  const [weatherIcon, setWeatherIcon] = useState('')

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

  const fetchWeatherData = (country) => {
        useEffect(() => {

            axios
                .get(`http://api.apixu.com/v1/current.json?key=26366877576b409c8be202313190402&q=${country.capital}`)
                .then(response => {
                    setWeatherData(response.data.current)
                    setWeatherIcon(response.data.current.condition.icon)
                })

        }, [])
    }

  return (
    <div>
      <form>
        <div>
          find countries: <input value={filter} onChange={handleFilterChange}/>
        </div>
      </form>
      <ul>
          <Display
            countriesToShow={countriesToShow}
            setFilter={setFilter}
            weatherData={weatherData}
            fetchWeatherData={fetchWeatherData}
            setWeatherIcon={setWeatherIcon}
            weatherIcon={weatherIcon}
          />
      </ul>
    </div>
  )
}

export default App
