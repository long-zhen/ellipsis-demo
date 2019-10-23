import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CITIES from 'constants/cities';

function CitySelect({ value, onChange }) {
  return (
    <FormControl>
      <InputLabel>Select City</InputLabel>
      <Select value={value} onChange={onChange}>
        {CITIES.map(city => (
          <MenuItem key={city.value} value={city.value}>
            {city.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CitySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default CitySelect;
