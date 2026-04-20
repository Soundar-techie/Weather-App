import React, { useEffect } from 'react';
import './index.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import { useWeather } from './hooks/useWeather';
import { getWeatherTheme, themeConfig } from './utils/weatherHelpers';

function App() {
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('nimbus_last_city');
    if (lastCity) fetchWeather(lastCity);
  }, [fetchWeather]);

  // Determine theme
  const isNight = new Date().getHours() < 6 || new Date().getHours() >= 20;
  const condition = weather?.weather?.[0]?.description || '';
  const themeName = weather ? getWeatherTheme(condition, isNight) : 'default';
  const theme = themeConfig[themeName];

  const lastCity = localStorage.getItem('nimbus_last_city');

  return (
    <div
      className="app"
      style={{
        background: theme.bg,
        '--blob-color': theme.accent,
        '--header-text': theme.textColor,
      }}
    >
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <span className="app-logo">🌤</span>
          <h1 className="app-title" style={{ color: theme.textColor }}>weather</h1>
          <p className="app-tagline" style={{ color: theme.textColor }}>Real-time weather, anywhere</p>
        </header>

        {/* Search */}
        <SearchBar onSearch={fetchWeather} loading={loading} theme={theme} />

        {/* Error */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Loader */}
        {loading && <Loader theme={theme} />}

        {/* Weather Data */}
        {!loading && weather && (
          <>
            <WeatherCard weather={weather} theme={theme} />
            <Forecast forecast={forecast} theme={theme} />
          </>
        )}

        {/* Welcome / empty state */}
        {!loading && !weather && !error && (
          <div className="welcome-state">
            <span className="welcome-icon">🌍</span>
            <p className="welcome-msg" style={{ color: theme.textColor }}>
              Enter a city name to get the current weather
            </p>
          </div>
        )}

        {/* Last searched hint */}
        {!loading && !weather && lastCity && (
          <p className="last-searched">
            Last searched:{' '}
            <button onClick={() => fetchWeather(lastCity)}>{lastCity}</button>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
