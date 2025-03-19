
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import HomePage from './HomePage';
import Header from './Header';
import AboutPage from './AboutPage';
import PredictionsPage from './PredictionsPage';
import ToolPage from './ToolPage'; // Import your new ToolPage component

// A component to conditionally render Header
const Layout = () => {
  const location = useLocation();

  // Only render Header if the current route is not the HomePage
  return (
    <>
      {/* Conditionally render Header based on route */}
      {location.pathname !== '/' && <Header />}

      {/* Render child routes inside the Layout */}
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* HomePage does not have the Header */}
          <Route path="/" element={<HomePage />} />

          {/* Wrap all other routes with Layout (which includes Header) */}
          <Route element={<Layout />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/predictions" element={<PredictionsPage />} />
            <Route path="/tool" element={<ToolPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;






