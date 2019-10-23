import React from 'react';
import PropTypes from 'prop-types';

function WeatherIcon({ icon, ...props }) {
  return (
    <img
      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="weather"
      {...props}
    />
  );
}

WeatherIcon.propTypes = {
  icon: PropTypes.string
};

export default WeatherIcon;
