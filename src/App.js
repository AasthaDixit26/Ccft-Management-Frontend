import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, CssBaseline } from "@mui/material";
import LoginPage from "./container/Login";
import Dashboard from "./container/dashboard";
import AllProjectsPage from "./container/AllProjects";
import Pendingpr from "./container/pendingPr";
import CompletePr from "./container/completePr";

const Navbar = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toDateString() + " " + now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img src="./ccft.png" alt="Company Logo" style={{ height: "50px", marginRight: "10px" }} />
        </Box>
        <Typography variant="subtitle2">{dateTime}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <AllProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/clients"
          element={
            <Layout>
              <AllProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/vendors"
          element={
            <Layout>
              <AllProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/tests"
          element={
            <Layout>
              <AllProjectsPage />
            </Layout>
          }
        />
         <Route
          path="/pendingPr"
          element={
            <Layout>
              <Pendingpr />
            </Layout>
          }
        />
         <Route
          path="/CompletePr"
          element={
            <Layout>
              <CompletePr />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
