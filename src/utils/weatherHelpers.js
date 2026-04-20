export const getWeatherTheme = (condition, isNight) => {
  const c = (condition || '').toLowerCase();
  if (isNight) return 'night';
  if (c.includes('thunder') || c.includes('storm')) return 'stormy';
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return 'rainy';
  if (c.includes('snow') || c.includes('sleet') || c.includes('blizzard')) return 'snowy';
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return 'foggy';
  if (c.includes('cloud') || c.includes('overcast')) return 'cloudy';
  if (c.includes('clear') || c.includes('sunny') || c.includes('sun')) return 'sunny';
  return 'default';
};

export const getWeatherIcon = (condition, isNight) => {
  const c = (condition || '').toLowerCase();
  if (c.includes('thunder')) return '⛈';
  if (c.includes('drizzle')) return '🌦';
  if (c.includes('rain')) return '🌧';
  if (c.includes('snow') || c.includes('blizzard')) return '❄️';
  if (c.includes('sleet')) return '🌨';
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return '🌫';
  if (c.includes('cloud') || c.includes('overcast')) return '☁️';
  if (c.includes('partly') || c.includes('scattered')) return '⛅';
  if (c.includes('clear') || c.includes('sunny')) return isNight ? '🌙' : '☀️';
  return isNight ? '🌙' : '🌤';
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
};

export const getDayLabel = (dateStr, index) => {
  if (index === 0) return 'Today';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

export const getUVLabel = (uv) => {
  if (uv <= 2) return { label: 'Low', color: '#4ade80' };
  if (uv <= 5) return { label: 'Moderate', color: '#facc15' };
  if (uv <= 7) return { label: 'High', color: '#fb923c' };
  if (uv <= 10) return { label: 'Very High', color: '#f87171' };
  return { label: 'Extreme', color: '#c084fc' };
};

export const mpsToKph = (mps) => Math.round(mps * 3.6);

export const formatVisibility = (meters) => {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
};

export const themeConfig = {
  sunny: {
    bg: 'linear-gradient(160deg, #f59e0b 0%, #fcd34d 40%, #fef3c7 100%)',
    accent: '#b45309',
    cardBg: 'rgba(255,255,255,0.25)',
    textColor: '#431407',
    subtitleColor: 'rgba(120,53,15,0.75)',
    particle: '☀️',
  },
  cloudy: {
    bg: 'linear-gradient(160deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
    accent: '#334155',
    cardBg: 'rgba(255,255,255,0.2)',
    textColor: '#0f172a',
    subtitleColor: 'rgba(15,23,42,0.65)',
    particle: '☁️',
  },
  rainy: {
    bg: 'linear-gradient(160deg, #1e3a5f 0%, #1d4ed8 55%, #3b82f6 100%)',
    accent: '#93c5fd',
    cardBg: 'rgba(255,255,255,0.12)',
    textColor: '#f0f9ff',
    subtitleColor: 'rgba(224,242,254,0.7)',
    particle: '💧',
  },
  stormy: {
    bg: 'linear-gradient(160deg, #0c0a1e 0%, #1e1b4b 50%, #312e81 100%)',
    accent: '#a78bfa',
    cardBg: 'rgba(255,255,255,0.08)',
    textColor: '#f5f3ff',
    subtitleColor: 'rgba(237,233,254,0.6)',
    particle: '⚡',
  },
  snowy: {
    bg: 'linear-gradient(160deg, #dbeafe 0%, #e0f2fe 50%, #f0f9ff 100%)',
    accent: '#0369a1',
    cardBg: 'rgba(255,255,255,0.35)',
    textColor: '#0c4a6e',
    subtitleColor: 'rgba(12,74,110,0.65)',
    particle: '❄️',
  },
  foggy: {
    bg: 'linear-gradient(160deg, #9ca3af 0%, #d1d5db 50%, #f3f4f6 100%)',
    accent: '#374151',
    cardBg: 'rgba(255,255,255,0.3)',
    textColor: '#111827',
    subtitleColor: 'rgba(17,24,39,0.6)',
    particle: '🌫',
  },
  night: {
    bg: 'linear-gradient(160deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
    accent: '#818cf8',
    cardBg: 'rgba(255,255,255,0.07)',
    textColor: '#f1f5f9',
    subtitleColor: 'rgba(241,245,249,0.55)',
    particle: '⭐',
  },
  default: {
    bg: 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    accent: '#38bdf8',
    cardBg: 'rgba(255,255,255,0.1)',
    textColor: '#f8fafc',
    subtitleColor: 'rgba(248,250,252,0.6)',
    particle: '🌤',
  },
};
