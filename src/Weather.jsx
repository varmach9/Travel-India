import React, { useEffect, useContext, useState } from 'react';
import { PlaceContext } from './Contexts/PlaceContext';
import axios from 'axios';

const Weather = (props) => {
  const { placeName } = useContext(PlaceContext);
  const [weatherForecast, setWeatherForecast] = useState(null);
  
  const [weatherForecast2, setWeatherForecast2] = useState([]);
  const getWeatherIcon = (weatherType) => {
    const iconMappings = {
      "few clouds": 'https://thumbs.gfycat.com/PoisedPleasingDrafthorse.webp',
      "light rain": 'https://content.presentermedia.com/content/animsp/00016000/16588/thunderstorm_flatcolor_image_md_nwm_v2.gif',
      "overcast clouds": 'https://media.tenor.com/EE35I6ksyuMAAAAM/clouds-cloudy.gif',
      "broken clouds":"data:image/jpeg;base64,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",
      "moderate rain":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcnkJWWf_VYZXcWHlVs66Y26D_drQ0ncvjhQ&usqp=CAU",
      "scattered clouds":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RqM9v0MHG14BzAx5JfIsQeR9_V6JWB7Kzw&usqp=CAU",
    };

    return iconMappings[weatherType] || "https://media.tenor.com/EE35I6ksyuMAAAAM/clouds-cloudy.gif";
  };
  useEffect(() => {
    if (placeName !== 'here') {
      fetchWeatherForecast();
    }
  }, [placeName]);

  const fetchWeatherForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${placeName === 'banglore' ? 'bengaluru' : placeName}&appid=46d3ae890ecc2c3b553f072b0594d39b&units=metric`
      );
      setWeatherForecast(response.data);
      setWeatherForecast2(response.data.list);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    }
  };

  const getDailyWeatherSummary = () => {
    if (!weatherForecast || !weatherForecast.list) {
      return [];
    }

    const dailySummary = {};

    for (let i = 0; i < weatherForecast.list.length; i++) {
      const forecast = weatherForecast.list[i];
      const forecastDate = forecast.dt_txt.split(' ')[0];

      if (!dailySummary[forecastDate]) {
        dailySummary[forecastDate] = {
          temperature: [],
          weatherTypes: {},
        };
      }

      dailySummary[forecastDate].temperature.push(forecast.main.temp);

      const weatherDescription = forecast.weather[0].description;

      if (dailySummary[forecastDate].weatherTypes[weatherDescription]) {
        dailySummary[forecastDate].weatherTypes[weatherDescription]++;
      } else {
        dailySummary[forecastDate].weatherTypes[weatherDescription] = 1;
      }
    }

    return dailySummary;
  };

  const renderDailyWeatherSummary = () => {
    const dailySummary = getDailyWeatherSummary();

    return Object.keys(dailySummary).map((date) => {
      const summary = dailySummary[date];
      const highestWeatherType = Object.keys(summary.weatherTypes).reduce((a, b) =>
        summary.weatherTypes[a] > summary.weatherTypes[b] ? a : b
      );

      return (
        <div key={date}>
          
          <p>{date}: {calculateAverageTemperature(summary.temperature)}°C
           and {highestWeatherType}<img src={getWeatherIcon(highestWeatherType)} alt="" width="20px" height="20px"/></p>

        </div>
      );
    });
  };
  
 
  const getHighestWeatherType = () => {
    let highestWeatherType = '';
    const weatherTypeCounts = {};
  
    weatherForecast2.forEach((forecast) => {
      const { weather } = forecast;
      const weatherType = weather[0].description;
  
      if (weatherTypeCounts[weatherType]) {
        weatherTypeCounts[weatherType]++;
      } else {
        weatherTypeCounts[weatherType] = 1;
      }
  
      if (!highestWeatherType || weatherTypeCounts[weatherType] > weatherTypeCounts[highestWeatherType]) {
        highestWeatherType = weatherType;
      }
    });
  
    return highestWeatherType;
  };

  const calculateAverageTemperature2 = () => {
    let totalTemperature = 0;
    let numForecasts = 0;

    weatherForecast2.forEach((forecast) => {
      const { main } = forecast;
      const temperature = main.temp;

      totalTemperature += temperature;
      numForecasts++;
    });

    return Math.round(totalTemperature / numForecasts);
  };

  const calculateAverageTemperature = (temperatureArray) => {
    const sum = temperatureArray.reduce((a, b) => a + b, 0);
    return Math.round(sum / temperatureArray.length);
  };

  return (
    <div>
      {placeName !== 'here' ? (
        <div>
          <h3>Weather Forecast for {placeName}</h3>
          {weatherForecast ? (
            <div>
              <p>The Near future weather forecast {getHighestWeatherType()}</p>
          <p>Temperature is {calculateAverageTemperature2()}°C, so plan accordingly</p>
              {renderDailyWeatherSummary()}
            </div>
          ) : (
            <p>Loading weather forecast...</p>
          )}
        </div>
      ) : (
        <div>Search for a place to see the weather forecast</div>
      )}
    </div>
  );
};

export default Weather;
