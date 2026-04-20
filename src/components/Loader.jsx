import React from 'react';

const Loader = ({ theme }) => {
  const textColor = theme?.textColor || '#f8fafc';

  return (
    <div className="loader-wrap" style={{ color: textColor }}>
      <div className="loader-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
      <p className="loader-text">Fetching weather data...</p>
    </div>
  );
};

export default Loader;
