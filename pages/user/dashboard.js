import React, { useEffect, useState } from 'react';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import Navbar from '../../components/UserDashboard/UserNavbar';

const Dashboard = () => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  return (
    <>
        <div className="bg-gray-100">
          <Navbar />
        </div>
    </>
  );
};

export default Dashboard;
