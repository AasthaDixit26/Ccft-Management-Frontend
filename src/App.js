import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, CssBaseline, IconButton } from "@mui/material";
import LoginPage from "./container/Login";
import Dashboard from "./container/dashboard";
import AllProjectsPage from "./container/AllProjects";
import Pendingpr from "./container/pendingPr";
import CompletePr from "./container/completePr";
import { Avatar } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BugReportIcon from "@mui/icons-material/BugReport";
import Client from "./container/client";
import Test from "./container/test";


const Navbar = () => {
  const [dateTime, setDateTime] = useState("");
  const [accountType, setAccountType] = useState("admin"); // Example roles: "admin", "employee", "tester"
  const [userName, setUserName] = useState("John Doe"); // Replace with actual user data

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toDateString() + " " + now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to get the corresponding icon based on the role
  const getAccountIcon = () => {
    switch (accountType) {
      case "admin":
        return <AdminPanelSettingsIcon fontSize="large" color="primary" />;
      case "employee":
        return <BusinessCenterIcon fontSize="large" color="success" />;
      case "tester":
        return <BugReportIcon fontSize="large" color="error" />;
      default:
        return null;
    }
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}> {/* Aligns content to the right */}
        {/* Account Section (Top Right Corner) */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton>{getAccountIcon()}</IconButton>
          <Typography variant="caption" color="inherit">{userName}</Typography>
        </Box>
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
          path="/all-projects"
          element={
            <Layout>
              <AllProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/completed-projects"
          element={
            <Layout>
              <CompletePr />
            </Layout>
          }
        />
          <Route
          path="/pending-projects"
          element={
            <Layout>
              <Pendingpr />
            </Layout>
          }
        />
        {/* <Route
          path="/vendors"
          element={
            <Layout>
              <Vendor />
            </Layout>
          }
        /> */}
        <Route
          path="/tests"
          element={
            <Layout>
              <Test />
            </Layout>
          }
        />
         <Route
          path="/clients"
          element={
            <Layout>
              <Client />
            </Layout>
          }
        />
         {/* <Route
          path="/CompletePr"
          element={
            <Layout>
              <CompletePr />
            </Layout>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
