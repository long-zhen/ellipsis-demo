import React from 'react';
import MainLayout from 'containers/layout/MainLayout';
import LogTable from 'containers/weather/LogTable';

function Logs() {
  return (
    <MainLayout title="Logs">
      <LogTable />
    </MainLayout>
  );
}

export default Logs;
