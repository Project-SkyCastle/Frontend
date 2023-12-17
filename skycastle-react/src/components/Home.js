import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './App.css';


const Home = ({ sendData }) => {
    const navigate = useNavigate();

    const responseGoogle = async (credentialResponse) => {
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
                onSuccess={responseGoogle}
                onError={() => {
                console.log('Login Failed');
                }}
            />
            <div style={styles.buttonContainer}>
              <Button
                label="Sign up"
                styles={styles.signUpButton}
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