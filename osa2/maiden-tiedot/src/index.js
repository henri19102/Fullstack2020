import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
   const List = () => {
     let start = 0
     let end = 0
     if (countryFilter.length >=1){
       end = 10
     }

    return (
      <div>
        {countries.filter(country => 
          country.name.toLowerCase()
          .includes(countryFilter.toLowerCase()))
          .slice(start,end)
          .map((country,i) => 
            <div key={i}>
          <h1 > {country.name}</h1>
          <p >Capital:  {country.capital}</p>
          <p >Population:  {country.population}</p>
          <h3>Languages</h3>
          <img src={country.flag} width={200} height={100} mode='fit' ></img>
          </div>
  )}
      </div>
    )
  }

const filter = (event) => {
  setCountryFilter(event.target.value)
}


  return (
    <div>
      <h1>Country stats</h1>
      <form >
        <h4>find countries:</h4>
        <input value={countryFilter} onChange={filter}/>
      </form>  
    <List/>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

