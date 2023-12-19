import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './App.css';


const Home = ({ sendData }) => {
    const navigate = useNavigate();
    const [role, set_role] = useState([]);

    const [isUser, setIsUser] = useState(false);
    const [isAnalyst, setIsAnalyst] = useState(false);
  
    const handleUserChange = () => {
      setIsUser(!isUser);
      setIsAnalyst(false);
    };
  
    const handleAnalystChange = () => {
      setIsAnalyst(!isAnalyst);
      setIsUser(false);
    };
  
    const handleSubmit = () => {
      // Handle the form submission based on the selected checkboxes (isUser, isAnalyst)
      console.log('User:', isUser);
      console.log('Analyst:', isAnalyst);
    };

    const responseGoogleLogin = async (credentialResponse) => {
        console.log('Google Sign-In Success:', credentialResponse);
  
        try {
          const response = await fetch('http://127.0.0.1:5000/google-sso-callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentialResponse['credential']),
          });
      
          const data = await response.json();
  
          if (response.ok) {
            set_role(data['role'])
            console.log('DATA: ', data);
            sendData(data)

          }
        } catch (error) {
          console.error('Error:', error);
        }

        if (role == "subscriber")
          navigate('/Subscriptions')
        if (role == "analyst")
          navigate('/Analyst')
        if (role == "admin")
          navigate('/Subscriptions')
    };

    const responseGoogleSignUp = async (credentialResponse) => {
      console.log('Google Sign-In Success:', credentialResponse);

      try {
        const response = await fetch('http://127.0.0.1:5000/google-sso-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentialResponse['credential']),
        });
    
        const data = await response.json();

        if (response.ok) {
          console.log('DATA: ', data);
          sendData(data)
        }
      } catch (error) {
        console.error('Error:', error);
      }

      navigate('/Welcome')
  };

    return (
        <div className="App">
            <header className="App-header">
            <h1>Welcome to Skycastle!</h1>
            <GoogleLogin
                onSuccess={responseGoogleLogin}
                shape="circle"
                text="continue_with"
                size="large"
                theme="filled_blue"
                onError={() => {
                console.log('Login Failed');
                }}
            />
            <h2> Or sign up as an user or analyst! </h2>
            <h3>
              <label>
                <input type="checkbox" checked={isUser} onChange={handleUserChange} />
                  Register as User
              </label>
              <br />
              <label>
                <input type="checkbox" checked={isAnalyst} onChange={handleAnalystChange} />
                  Register as Analyst
              </label>
              <br />
            </h3>
            <div style={styles.buttonContainer}>
              <GoogleLogin
                  onSuccess={responseGoogleSignUp}
                  shape="circle"
                  text="signup_with"
                  size="large"
                  onError={() => {
                  console.log('Login Failed');
                  }}
              />
            </div>

            </header>
        </div>
  );
};

export default Home;

const styles = {
  signUpButton: {
    fontSize: `min(16px, 3.3vw)`,
    border: '2px solid #000000',
    width: '150%',
    marginTop: '100px', 
    margin: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    cursor: 'pointer',
  }
}