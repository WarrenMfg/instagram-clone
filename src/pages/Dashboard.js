import React, { useEffect } from 'react';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  // update title
  useEffect(() => (document.title = 'Dashboard - Instagram'), []);

  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}

export default Dashboard;
