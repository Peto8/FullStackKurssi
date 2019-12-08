import React, { useState, useEffect } from 'react'
import axios from 'axios'


//Display single country info and weather
const Country = (props) => {
    let weather_info = ""
    if (props.weather.length !== 0){
        weather_info = <div>
            <p><b>temperature: </b>{props.weather.current.temperature} Celsius</p>
            <img id="flag" src={props.weather.current.weather_icons[0]}  height="60" alt="Weather"/>
            <p><b>wind:</b>{props.weather.current.wind_speed} km/h direction {props.weather.current.wind_dir}</p>
            </div>
    }

    let languages = props.country.languages.map(language =>
        <li key={language.name}>{language.name}</li>)
        
    return (
    <div>
        <h1>{props.country.name}</h1>
        <p>capital:    {props.country.capital}</p>
        <p>population: {props.country.population}</p>
        <h3>languages</h3>
        <ul>
            {languages}
        </ul>
        <img id="flag" src={props.country.flag}  height="60" alt="Flag"/>
        {weather_info}
    </div>
)}



const Matches = (props) => {
    let amount = props.matches.length
    switch(true) {
        case amount > 10:
            return <p>Too many matches, please specify more!</p>
        case amount === 0:
            return <p>No matches</p>
        case amount === 1:
            return <Country country={props.matches[0]} weather={props.weather}/>
        default:
            return (
                <table>
                    <tbody>
                        {props.matches.map(country =>
                        <tr key={country.name}>
                        <td>{country.name}</td>
                        <td><button type="button" onClick={() => props.showChosenCountry(country)}>Show</button></td>
                        </tr>)}
                    </tbody>
                </table>
                )
        } 
    }

    
const App = () => {
    const [ newSearch, setNewSearch ] = useState('')
    const [ allCountries, setAllCountries] = useState([])
    const [ matches, setNewMatch] = useState([])
    const [ weather, setWeather] = useState([])

    const showChosenCountry = (country) => {
        setNewMatch([country])
    }

    const searchCountries = (search) =>{
        var search_results = []
        if (search !== ''){
            search_results = allCountries.filter(function(country) {
            return country.name.toLowerCase().includes(search.toLowerCase())
        })
        }   
        setNewMatch(search_results)
    }

       
    //Get Country
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all') //get countries
        .then(response => {
            setAllCountries(response.data)
        })
    }, [])

    
    //Get Weather
    useEffect(() => {
        //Only get if one country is showed
        if (matches.length === 1) {
            setWeather([]) //Not to show weather before loaded

            let query = matches[0].capital
            let key = "016fc882116369704dcc2819e1eb38a6"
            let adress =  'http://api.weatherstack.com/current?access_key='+key+'&query='+query
            axios
            .get(adress)
            .then(response => {
                setWeather(response.data)
            })
        }
      }, [matches]) //Effect only run when matches is edited
   
    //have to use target value insteat of newSearch,
    //because setting newSearch takes time
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
        searchCountries(event.target.value)
      }

    return (
    <div>
        <form>
            <div>Find countries: <input value={newSearch} onChange={handleSearchChange}/></div>
        </form>
        <Matches matches={matches} showChosenCountry={showChosenCountry} weather={weather} />
    </div>
    )
}

export default App