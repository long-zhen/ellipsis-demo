import apisauce from 'apisauce';

function create() {
  const api = apisauce.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    responseType: 'json'
  });

  const get = city =>
    api.get('weather', {
      q: city,
      appId: process.env.REACT_APP_WEATHER_APP_ID
    });

  return {
    get
  };
}

export default create();
