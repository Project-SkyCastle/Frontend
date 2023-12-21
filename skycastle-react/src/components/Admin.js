import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import { jwtDecode } from "jwt-decode";
import { jwtEncode } from "jwt-encode";
import axios from 'axios';

const sampleData = [
  {user_cnt: 100, report_cnt: 1000, sub_cnt: 1000000},,
];

const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>User_id</th>
          <th>Email</th>
          <th>Creation Date</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.user_id}>
            <td>{item.user_id}</td>
            <td>{item.email}</td>
            <td>{item.created}</td>
            <td>{item.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const Admin = () => {
  const [realData, setRealData] = useState([])

  const sign = require('jwt-encode');
  const secret = 'skycastle1';
  const data = {
    sub: '1234',
    name: 'John Doe',
    iat: 1516239022
  };
  const jwt = sign(data, secret);

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        // const response = await axios.get('http://ec2-3-144-38-237.us-east-2.compute.amazonaws.com:8012/user', {
        const response = await axios.get('https://nhrxd2rihl.execute-api.us-east-2.amazonaws.com/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        console.log(result)
        setRealData(result)

  
      } catch (error) {
          console.error('Error during GET subscription/full:', error);
      }
    }
    fetchData();
  },[]);

  return (
    <div className="App">
      <header className="Page-header">
        <h2>Admin View: </h2>
          <div className='App-container'>
            <SubscriptionTable data={realData}/>
          </div>
      </header>
    </div>
  );
}

export default Admin;