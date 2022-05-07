import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=45ad3a9d4abbb937e7491bf6ac359691`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('');
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="search">
          <input type="text" value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} placeholder='Enter Location' />
        </div>
        <div className="top">
          <div className="location">
            <h3>{data.name}</h3>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}

          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="description">
            {data.main ? <p>H:{data.main.temp_max.toFixed()}° L:{data.main.temp_min.toFixed()}°</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind</p>
              {data.wind ? <p>{data.wind.speed.toFixed()}mph</p> : null}
            </div>
          </div>
        }
      </div>
    </div>

  );
}

export default App;
