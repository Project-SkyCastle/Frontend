import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Subscriptions from "./components/Subscriptions.js";
import Analyst from "./components/Analyst.js";
import Admin from "./components/Admin.js";
import Home from "./components/Home";
import User from "./components/User.js";
import Search from "./components/Search.js";


const App = () => {
  return (
    <GoogleOAuthProvider clientId='683899391622-2a7tpakgchh1vaaa3at1h5ojejk2fgt8.apps.googleusercontent.com'>
      <Router>
        <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Analyst" element={<Analyst />} />
              <Route path="/User" element={<User />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Subscriptions" element={<Subscriptions />} />
            </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider> 
  );
};

export default App;