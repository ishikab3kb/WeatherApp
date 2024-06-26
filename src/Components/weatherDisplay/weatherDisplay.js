import React, { useEffect, useReducer, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
// import { MdOutlineSearch } from "react-icons/md";
// import weatherImg from '../../assets/1_Plw1KZLAw_S7iB69ES4pmw.png'
import './weatherDisplay.css'
import axios from 'axios';
// import API_KEY from '../../keys'
// import env from "react-dotenv";
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../Reducer'

const api_key = process.env.REACT_APP_API_KEY;

const intialState = 'CLEAR_DAY'
const reducer = (state,action) => {
  switch (action) {
    case "Clear":
      return "CLEAR_DAY";
    case "Clouds":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Snow":
      return "SNOW";
    case "Dust":
      return "WIND";
    case "Drizzle":
      return "SLEET";
    case "Fog":
      return "FOG";
    case "Smoke":
      return "FOG";
    case "Tornado":
      return "WIND";
    default:
      return state;
  }
}

const WeatherDisplay = () => {

  const [weatherData,setWeatherData] = useState(null)
  // const [error,setError] = useState('')
  const [weatherIcon,setWeatherIcon] = useReducer(reducer,intialState)
  // const [enteredCity, setEnteredCity] = useState('')
  const [enteredlat, setEnteredlat] = useState('')
  const [enteredlon, setEnteredlon] = useState('')
  // const [city,setCity] = useState('');
  const [{lat,lon},dispatch] = useStateValue()
  const [showFah, setShowFah] = useState(false);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`).then((response) => {
      console.log(response.data);
      setWeatherData(response.data);
      // setError('');
      setWeatherIcon(response.data.weather[0].main);
    })
    .catch(() => {
      setWeatherData({});
      // setError('Data not found');
      // console.log(error);
    })

    // console.log(navigator.geolocation)
  },[lat,lon])

  // useEffect(() => {
  //   axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${API_KEY}`).then((response) => {
  //     console.log(response.data);
  //     dispatch({type: actionTypes.SET_COORD,
  //         lat: response.data[0].lat,
  //         lon: response.data[0].lon})
  //   })
  //   .catch(() => {
  //     setError('Data not found');
  //   })
  // },[city])



  return (
    <div className='weatherDisplay'>
      <div className='weatherDisplay_detailed-info'>
      <h1>Weather App</h1>
      <form className='searchData'>
        <label>Latitute</label>
        <input type='text' value={enteredlat} onChange={(e) => setEnteredlat(e.target.value)}></input>
        <br></br>
        <label>Longitute</label>
        <input type='text' value={enteredlon} onChange={(e) => setEnteredlon(e.target.value)}></input>
        <br></br>
        <button onClick={(e) => {dispatch({type: actionTypes.SET_COORD,
          lat: parseFloat(enteredlat,10),
          lon: parseFloat(enteredlon,10)})
          e.preventDefault();
        }}>Search Current Weather</button>
        <br></br>
        <div className='scroll_switch'>
        <p>Switch to Fahrenheit:</p>
        <label class="switch">
          <input type="checkbox" onClick={() => setShowFah(!showFah)}/>
          <span class="slider round"></span>
        </label>
        </div>
          
      </form>
      {/* <div className='searchBar'>
          <input type='text' value={enteredCity} onChange={(e) => setEnteredCity(e.target.value)}></input>
          <MdOutlineSearch onClick={() => setCity(enteredCity)}></MdOutlineSearch>
      </div> */}
        {lat && lon && (
          <div className='weather-data'>
          <ReactAnimatedWeather
        icon={weatherIcon}
        color='white'
        size={100}
        animate={true}
        />
        <h1>{weatherData ? `${weatherData.name}` : ''}</h1>
        <hr></hr>
        <h4>{weatherData ? `${weatherData.weather[0].description}` : ''}</h4>
          <ul className='property-list'>
            <li className='property'>
              <p>Temperature</p>
              <p>{`${(weatherData ? (showFah ? (Math.floor((9/5)*((weatherData.main.temp)-273.15)) + 32) : (Math.floor((weatherData.main.temp)-273.15))) : 0)} °`} {showFah ? 'F' : 'C'} {weatherData ? `(${weatherData.weather[0].main})` : ''}</p>
            </li>
            <li className='property'>
              <p>Humidity</p>
              <p>{weatherData ? `${weatherData.main.humidity}%` : ''}</p>
            </li>
            <li className='property'>
              <p>Wind-Speed</p>
              <p>{weatherData ? `${weatherData.wind.speed} miles/hr` : ''}</p>
            </li>
          </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherDisplay