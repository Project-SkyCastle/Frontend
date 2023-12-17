import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './App.css';
import Subscriptions from "./components/Subscriptions.js";
import Analyst from "./components/Analyst.js";
import Admin from "./components/Admin.js";
import Home from "./components/Home";
import Welcome from "./components/Welcome.js";


const App = () => {
  return (
    <GoogleOAuthProvider clientId='683899391622-2a7tpakgchh1vaaa3at1h5ojejk2fgt8.apps.googleusercontent.com'>
      <Router>
        <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Analyst" element={<Analyst />} />
              <Route path="/Welcome" element={<Welcome />} />
              <Route path="/Subscriptions" element={<Subscriptions />} />
            </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider> 
  );
};

export default App;