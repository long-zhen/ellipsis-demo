import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WeatherIcon } from 'components/weather';
import { LoadingContainer } from 'components/common';
import WeatherApi from 'services/weather';
import notifier from 'utils/notifier';
import AppActions, { AppSelectors } from 'redux/AppRedux';
import CitySelect from './CitySelect';

function CityWeather({ city, setCity }) {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const resp = await WeatherApi.get(city);
      if (!resp.ok) {
        console.error(resp.data);
        notifier.error(`There was problem loading weather for ${city}`);
      } else {
        setWeather(get(resp, 'data.weather.0'));
      }
      setLoading(false);
    };

    if (city) {
      loadData();
    }
  }, [city]);

  const handleCityChange = evt => {
    if (evt.target.value !== city) {
      setCity(evt.target.value);
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <CitySelect value={city} onChange={handleCityChange} />
      {city && (
        <LoadingContainer loading={loading || !weather}>
          {() => (
            <Box component={Paper} p={2}>
              <Typography variant="h5">{weather.main}</Typography>
              <Typography variant="subtitle2">{weather.description}</Typography>
              <WeatherIcon icon={weather.icon} />
            </Box>
          )}
        </LoadingContainer>
      )}
    </Box>
  );
}

CityWeather.propTypes = {
  city: PropTypes.string,
  setCity: PropTypes.func
};

const mapStatesToProps = state => ({
  city: AppSelectors.selectCity(state)
});

const mapDispatchToProps = dispatch => ({
  setCity: city => dispatch(AppActions.setCity(city))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(CityWeather);
