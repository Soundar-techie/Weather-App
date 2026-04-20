import { useState, useCallback } from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log("API KEY:", process.env.REACT_APP_WEATHER_API_KEY);

  // const fetchWeather = useCallback(async (city) => {
  //   if (!city.trim()) return;

  //   if (!API_KEY || API_KEY === '2c38b67a94d56577b482cc15b1cfb0fd') {
  //     setError('API key missing. Add your OpenWeatherMap key to the .env file as REACT_APP_WEATHER_API_KEY.');
  //     return;
  //   }

  //   setLoading(true);
  //   setError('');
  //   setWeather(null);
  //   setForecast(null);

  //   try {
  //     const [wRes, fRes] = await Promise.all([
  //       fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
  //       fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
  //     ]);

  //     if (!wRes.ok) {
  //       const errData = await wRes.json().catch(() => ({}));
  //       if (wRes.status === 401) throw new Error('Invalid API key. Check your .env file.');
  //       if (wRes.status === 404) throw new Error(`"${city}" not found. Try another city name.`);
  //       throw new Error(errData.message || 'Something went wrong. Please try again.');
  //     }

  //     const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
  //     setWeather(wData);
  //     setForecast(fData);
  //     localStorage.setItem('nimbus_last_city', city);
  //   } catch (err) {
  //     if (err.name === 'TypeError') {
  //       setError('Network error. Check your internet connection.');
  //     } else {
  //       setError(err.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    if (!API_KEY) {
      setError('API key missing. Check your .env file.');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);

    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
      ]);

      if (!wRes.ok) {
        const errData = await wRes.json().catch(() => ({}));
        if (wRes.status === 401) throw new Error('Invalid API key.');
        if (wRes.status === 404) throw new Error(`"${city}" not found.`);
        throw new Error(errData.message || 'Something went wrong.');
      }

      const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
      setWeather(wData);
      setForecast(fData);

      localStorage.setItem('nimbus_last_city', city);

    } catch (err) {
      if (err.name === 'TypeError') {
        setError('Network error.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);
  return { weather, forecast, loading, error, fetchWeather };
};
