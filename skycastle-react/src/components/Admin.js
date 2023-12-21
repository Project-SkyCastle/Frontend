import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import axios from 'axios';

const sampleData = [
  {user_cnt: 100, report_cnt: 1000, sub_cnt: 1000000},
];


const sampleAgg = {"MS-1-User":16,"MS-2-Report":11, "MS-3-Subscription": 57}
const aggArray = Object.entries(sampleAgg);
const keyValuePairs = aggArray.map(([key, value]) => ({ [key]: value }));
console.log("keyValuePairs", keyValuePairs)

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

const AggTable = ({ data }) => {
  const tableData = Object.entries(data);

  return (
    <div>
      <table className="subscription-table" >
        <thead>
          <tr>
            <th>Microservice Key</th>
            <th>Count Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(([key, value]) => (
            <tr key={key} >
              <td >{key}</td>
              <td >{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Admin = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.state);
  let email = queryParams.get('email');
  let name = queryParams.get('name');
  let role = queryParams.get('role');
  let user_id = queryParams.get('user_id');
  const [realData, setRealData] = useState([])
  const [aggData, setAggData] = useState([])
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
        const response = await axios.get('https://nhrxd2rihl.execute-api.us-east-2.amazonaws.com/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        console.log("SubscriptionTable",result)
        setRealData(result)

  
      } catch (error) {
          console.error('Error during GET subscription/full:', error);
      }
    }
    fetchData();
  },[]);

  useEffect(() =>{
    const fetchAgg = async(e) => {
      try {
        const response = await axios.get('http://ec2-13-211-38-75.ap-southeast-2.compute.amazonaws.com:8012/show_stat', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        console.log("Agg Results",result)
        setAggData(result)

      } catch (error) {
          console.error('Error during GET show_stata:', error);
      }
    }
    fetchAgg();
  },[]);


  return (
    <div className="App">
      <header className="Page-header">
        <h2>Administrator: {email}</h2>
        <h3>Aggregator Stats:</h3>
        <div>
          <AggTable data={aggData} />
        </div>
        <h3>User List (secured resource):</h3>
          <div className='App-container'>
            <SubscriptionTable data={realData}/>
          </div>
      </header>
    </div>
  );
}

export default Admin;