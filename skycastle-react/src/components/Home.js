import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Button from './Button';
import './App.css';
import { withRouter } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { jwtEncode } from "jwt-encode";
import axios from 'axios';


const Home = ({ history, sendData}) => {
    const navigate = useNavigate();
    const [role, set_role] = useState([]);

    const [isUser, setIsUser] = useState(true);
    const [isAnalyst, setIsAnalyst] = useState(false);

    const showAlert = () => {
      alert('User not found. Please register as a new User or Analyst!');
    };
  
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

    const responseGoogleLoginJWT = async (credentialResponse) => {
      console.log('Google Sign-In Success:', credentialResponse);
      const decoded = jwtDecode(credentialResponse.credential);

      try {
        const response = await axios.get('http://ec2-3-144-38-237.us-east-2.compute.amazonaws.com:8012/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        const result = response.data

        if (result) {
          const userWithMatchingEmail = result.find(user => user.email === decoded.email);
          const role = userWithMatchingEmail ? userWithMatchingEmail.role : null;
          const user_id = userWithMatchingEmail ? userWithMatchingEmail.user_id : null;
          console.log("role: ", role)

          if (role === "CLIENT")
            navigate('/User', {
              state: {
                email: decoded.email,
                name: decoded.name,
                role: role,
                user_id: user_id
              }
          })
          
          else if (role === "ANALYST")
            navigate('/Analyst', {
              state: {
                email: decoded.email,
                name: decoded.name,  // Include additional props
                role: role,
                user_id: user_id
              }
            })
          }

          else {
            showAlert();
          }

      } catch (error) {
          console.error('Error getting role:', error);
      }
  };

    const responseGoogleLogin = async (credentialResponse) => {
        console.log('Google Sign-In Success:', credentialResponse);
        const decoded = jwtDecode(credentialResponse.credential);

        try {
          const response = await axios.get('http://ec2-3-144-38-237.us-east-2.compute.amazonaws.com:8012/user', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          console.log(response)
          const result = response.data

          if (result) {
            const userWithMatchingEmail = result.find(user => user.email === decoded.email);
            const role = userWithMatchingEmail ? userWithMatchingEmail.role : null;
            const user_id = userWithMatchingEmail ? userWithMatchingEmail.user_id : null;
            console.log("role: ", role)

            if (role === "CLIENT")
              navigate('/User', {
                state: {
                  email: decoded.email,
                  name: decoded.name,
                  role: role,
                  user_id: user_id
                }
            })
            
            else if (role === "ANALYST")
              navigate('/Analyst', {
                state: {
                  email: decoded.email,
                  name: decoded.name,  // Include additional props
                  role: role,
                  user_id: user_id
                }
              })
            }

            else {
              showAlert();
            }

        } catch (error) {
            console.error('Error getting role:', error);
        }
    };


    const responseGoogleSignUp = async (credentialResponse) => {
      console.log('Google Register Success:', credentialResponse);
      const decoded = jwtDecode(credentialResponse.credential);
      const sign_up_role = "CLIENT"

      if (isAnalyst){
        sign_up_role = "ANALYST"
      }

      console.log(sign_up_role)

      try {
        const response = await axios.post('http://ec2-3-144-38-237.us-east-2.compute.amazonaws.com:8012/user', {
              "email": decoded.email,
              "role": sign_up_role
        });
        console.log(response)
        const result = response.data

        if (result) {
          const user_id = result.user_id

          if (sign_up_role === "CLIENT")
            navigate('/User', {
              state: {
                email: decoded.email,
                name: decoded.name,
                role: sign_up_role,
                user_id: user_id
              }
          })
          
          else if (sign_up_role === "ANALYST")
            navigate('/Analyst', {
              state: {
                email: decoded.email,
                name: decoded.name,  // Include additional props
                role: sign_up_role,
                user_id: user_id
              }
            })
          }

          else {
            showAlert();
          }

      } catch (error) {
          console.error('Error getting role:', error);
      }
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
            <h2> New? Sign up as a client or analyst below... </h2>
            <h3>
              <label>
                <input type="checkbox" checked={isUser} onChange={handleUserChange} />
                  Enroll as Client
              </label>
              <br />
              <label>
                <input type="checkbox" checked={isAnalyst} onChange={handleAnalystChange} />
                  Enroll as Analyst
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