import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './container/dashboard';
import AllProjects from './container/AllProjects';
import CompletedProjects from './container/completePr';
import PendingProjects from './container/pendingPr';
import Clients from './container/client';
import Tests from './container/test';
import Users from './container/User';
import Vendors from './container/vendor'; 
import Sidebar from './container/sidebar';
import LoginPage from './container/Login';

const App = () => {
  return (
    <Router>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/completed-projects" element={<CompletedProjects />} />
        <Route path="/pending-projects" element={<PendingProjects />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/users" element={<Users />} />
        <Route path="/vendors" element={<Vendors />} /> {/* Add the route for Vendors */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;