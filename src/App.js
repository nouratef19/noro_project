

import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop smooth color="#f06292" />
    </div>
  );
}

export default App;