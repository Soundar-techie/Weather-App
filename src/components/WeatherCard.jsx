import React, { useState, useEffect } from 'react';
import {
  getWeatherIcon,
  formatDate,
  formatTime,
  mpsToKph,
  formatVisibility,
  themeConfig,
} from '../utils/weatherHelpers';

const StatTile = ({ icon, label, value, theme }) => (
  <div className="stat-tile" style={{ '--card-bg': theme?.cardBg, '--text': theme?.textColor }}>
    <span className="stat-tile-icon">{icon}</span>
    <span className="stat-tile-label">{label}</span>
    <span className="stat-tile-value">{value}</span>
  </div>
);

const WeatherCard = ({ weather, theme }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!weather) return null;

  const { main, weather: conditions, wind, sys, name, visibility } = weather;
  const condition = conditions[0];
  const isNight = now.getHours() < 6 || now.getHours() >= 20;
  const icon = getWeatherIcon(condition.description, isNight);
  const cardBg = theme?.cardBg || 'rgba(255,255,255,0.15)';
  const textColor = theme?.textColor || '#fff';
  const subtitleColor = theme?.subtitleColor || 'rgba(255,255,255,0.6)';
  const accent = theme?.accent || '#38bdf8';

  return (
    <div className="weather-card fade-in" style={{ '--card-bg': cardBg, '--text': textColor, '--subtitle': subtitleColor, '--accent': accent }}>
      {/* Header */}
      <div className="wc-header">
        <div className="wc-location">
          <svg className="pin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h2 className="wc-city">{name}, {sys.country}</h2>
        </div>
        <div className="wc-datetime">
          <span className="wc-date">{formatDate(now)}</span>
          <span className="wc-time">{formatTime(now)}</span>
        </div>
      </div>

      {/* Main temp */}
      <div className="wc-main">
        <div className="wc-temp-group">
          <span className="wc-temp">{Math.round(main.temp)}</span>
          <span className="wc-unit">°C</span>
        </div>
        <div className="wc-icon-group">
          <span className="wc-icon">{icon}</span>
          <span className="wc-condition">{condition.description}</span>
          <span className="wc-feels">Feels like {Math.round(main.feels_like)}°C</span>
        </div>
      </div>

      {/* Hi / Lo */}
      <div className="wc-hilo">
        <span>↑ {Math.round(main.temp_max)}°C</span>
        <span className="hilo-div">·</span>
        <span>↓ {Math.round(main.temp_min)}°C</span>
      </div>

      {/* Stats grid */}
      <div className="stats-grid">
        <StatTile icon="💧" label="Humidity" value={`${main.humidity}%`} theme={theme} />
        <StatTile icon="💨" label="Wind" value={`${mpsToKph(wind.speed)} km/h`} theme={theme} />
        <StatTile icon="🌡️" label="Pressure" value={`${main.pressure} hPa`} theme={theme} />
        <StatTile icon="👁️" label="Visibility" value={formatVisibility(visibility || 0)} theme={theme} />
        {sys.sunrise && (
          <StatTile
            icon="🌅"
            label="Sunrise"
            value={formatTime(new Date(sys.sunrise * 1000))}
            theme={theme}
          />
        )}
        {sys.sunset && (
          <StatTile
            icon="🌇"
            label="Sunset"
            value={formatTime(new Date(sys.sunset * 1000))}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
