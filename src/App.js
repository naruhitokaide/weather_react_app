import React, {useState} from 'react';
import './App.css';
import axios  from "axios";
import Search from './components/Search';
import {weatherForecast} from './Api'
import Weather from './components/Weather';
import Loader from './components/Loader';

function App() {
  const [state, setState] = useState({
    value: '',
    current: {
    },
    weekInfo: [],
    loading: false,
    error: false,
  })
  
  const handleInputChange = e => {
    setState({
      ...state,
      value: e.target.value,
    })
  };

  const handleSearchCity = e => {
    e.preventDefault();
    setState({
      ...state,
      loading: true,
    })
    axios.get(weatherForecast(state.value))
    .then(response => {
      const data = response.data
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Nocvember',
        'December',
      ]

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const currentDate = new Date()
      const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`;

      const sunset = new Date(data.list[0].sunset * 1000).toLocaleTimeString().slice(0, 4)
      const sunrise = new Date(data.list[0].sunrise * 1000).toLocaleTimeString().slice(0, 4)

      const current = {
        city: data.city.name,
        country: data.city.country,
        date,
        population: data.city.population,
        desc: data.list[0].weather[0].description,
        main: data.list[0].weather[0].main,
        icon: data.list[0].weather[0].icon,
        temp: data.list[0].temp.day,
        hTemp: data.list[0].temp.max,
        lTemp: data.list[0].temp.min,
        sunrise,
        sunset,
        clouds: data.list[0].clouds,
        humidity: data.list[0].humidity,
        wind: data.list[0].speed,
        pressure: data.list[0].pressure,
      }

      const weekData = data.list
      const weekInfo = weekData.map((data, index) => {
        return{
          key:index,
          main: data.weather[0].main,
          day: new Date(data.dt * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).slice(0,3),
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          hTemp: data.temp.max,
          lTemp: data.temp.min,
        }})

      setState({
        ...state,
        current,
        weekInfo,
        loading: false,
        error: false,
      })
      
      })
      .catch(error => {
        console.log(error);

        setState({
          ...state,
          loading: false,
          error: true,
          current: {},
          weekInfo: [],
        })
      })
    }

  return (
    <>
      <Search 
        value={state.value}
        data = {state}
        showResult={(state.weatherInfo || state.error) && true}
        change={handleInputChange}
        submit={handleSearchCity} 
      />
      {
        state.loading === true ? 
        <Loader /> :
      <div>  
        {state.current.country !== undefined ? 
        <div className="weather">
          <Weather today={state.current} weekly={state.weekInfo} />
        </div> : 
        state.error ? 
        <p className="error__loc">Sorry! we donot have any information on specified location.</p> :
        <div>

        </div>
        }
      </div>
      }
    </>
  )
}

export default App;
