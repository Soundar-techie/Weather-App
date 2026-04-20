import React from 'react';
import { getWeatherIcon, getDayLabel } from '../utils/weatherHelpers';

const Forecast = ({ forecast, theme }) => {
  if (!forecast?.list) return null;

  // Group by day, pick midday reading
  const dailyMap = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyMap[date]) {
      dailyMap[date] = [];
    }
    dailyMap[date].push(item);
  });

  const days = Object.entries(dailyMap)
    .slice(0, 5)
    .map(([date, items], idx) => {
      const temps = items.map((i) => i.main.temp);
      // Prefer midday reading for icon/condition
      const midday = items.find((i) => i.dt_txt.includes('12:00:00')) || items[Math.floor(items.length / 2)];
      return {
        date,
        label: getDayLabel(date, idx),
        high: Math.round(Math.max(...temps)),
        low: Math.round(Math.min(...temps)),
        condition: midday.weather[0].description,
        pop: Math.round((midday.pop || 0) * 100),
      };
    });

  const cardBg = theme?.cardBg || 'rgba(255,255,255,0.12)';
  const textColor = theme?.textColor || '#fff';
  const subtitleColor = theme?.subtitleColor || 'rgba(255,255,255,0.55)';

  return (
    <div className="forecast-section fade-in" style={{ '--text': textColor, '--subtitle': subtitleColor }}>
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map((day, idx) => (
          <div
            key={day.date}
            className="forecast-card"
            style={{ '--card-bg': cardBg, '--text': textColor, '--subtitle': subtitleColor, animationDelay: `${idx * 80}ms` }}
          >
            <span className="fc-day">{day.label}</span>
            <span className="fc-icon">{getWeatherIcon(day.condition, false)}</span>
            <span className="fc-desc">{day.condition}</span>
            <div className="fc-temps">
              <span className="fc-high">{day.high}°</span>
              <span className="fc-low">{day.low}°</span>
            </div>
            {day.pop > 0 && (
              <span className="fc-rain">💧 {day.pop}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
