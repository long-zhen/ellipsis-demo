import React from 'react';
import MainLayout from 'containers/layout/MainLayout';
import CityWeather from 'containers/weather/CityWeather';

function Home() {
  return (
    <MainLayout title="Home">
      <CityWeather />
    </MainLayout>
  );
}

export default Home;
