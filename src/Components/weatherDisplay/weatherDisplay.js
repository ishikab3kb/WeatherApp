import React, { useEffect, useReducer, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
// import { MdOutlineSearch } from "react-icons/md";
import weatherImg from '../../assets/1_Plw1KZLAw_S7iB69ES4pmw.png'
import './weatherDisplay.css'
import axios from 'axios';
import API_KEY from '../../keys'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../Reducer'

const intialState = 'CLEAR_DAY'
const reducer = (state,action) => {
  switch (action) {
    case "Clear":
      return "CLEAR_DAY";
      break;
    case "Clouds":
      return "CLOUDY";
      break;
    case "Rain":
      return "RAIN";
      break;
    case "Snow":
      return "SNOW";
      break;
    case "Dust":
      return "WIND";
      break;
    case "Drizzle":
      return "SLEET";
      break;
    case "Fog":
      return "FOG";
      break;
    case "Smoke":
      return "FOG";
      break;
    case "Tornado":
      return "WIND";
      break;
    default:
      return state;
  }
}

const WeatherDisplay = () => {

  const [weatherData,setWeatherData] = useState(null)
  const [error,setError] = useState('')
  const [weatherIcon,setWeatherIcon] = useReducer(reducer,intialState)
  // const [enteredCity, setEnteredCity] = useState('')
  const [enteredlat, setEnteredlat] = useState('')
  const [enteredlon, setEnteredlon] = useState('')
  // const [city,setCity] = useState('');
  const [{lat,lon},dispatch] = useStateValue()

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then((response) => {
      console.log(response.data);
      setWeatherData(response.data);
      setError('');
      setWeatherIcon(response.data.weather[0].main)
    })
    .catch(() => {
      setWeatherData({});
      setError('Data not found');
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
              <p>{weatherData ? `${weatherData.main.temp} °F` : ''} {`(Haze)`}</p>
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