import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const sampleData = [
  {subscription_id: 'ABCD1', sub_text: "Stock is up!", analyst: 'John Smith'},
  {subscription_id: 'ABCD2', sub_text: "Stock is down!", analyst: 'John Doe'},
];

const dummyData = [
  {
    subscription_id: 1234, 
    subscriber_id: 2345, 
    analyst_id: 3456,
    report_id: 4567,
    subscription_date: "Nov 21, 2023",
    feedback: "feedbacks",
    notification: "notifications",
    activity: "activites"
  },
  {
    subscription_id: 1234, 
    subscriber_id: 2345, 
    analyst_id: 3456,
    report_id: 4567,
    subscription_date: "Nov 21, 2023",
    feedback: "feedbacks",
    notification: "notifications",
    activity: "activites"
  }
];

const keys = [
  "subscription_id",
  "subscriber_id",
  "analyst_id",
  "report_id",
  "subscription_date",
  "feedback",
  "notification",
  "activity"
];

const keyMappings = {
  0: 'subscription_id',
  1: 'subscriber_id',
  2: 'analyst_id',
  3: 'report_id',
  4: 'subscription_date',
  5: 'feedback',
  6: 'notification',
  7: 'activity'
};


const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Subscription ID</th>
          <th>User ID</th>
          <th>Analyst ID</th>
          <th>Report ID</th>
          <th>Subscription Date</th>
          <th>Feedback</th>
          <th>Notification</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.subscription_id}>
            <td>{item.subscription_id}</td>
            <td>{item.subscriber_id}</td>
            <td>{item.analyst_id}</td>
            <td>{item.report_id}</td>
            <td>{item.subscription_date}</td>
            <td>{item.feedback}</td>
            <td>{item.notification}</td>
            <td>{item.activity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const User = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.state);
  let email = queryParams.get('email');
  let name = queryParams.get('name');
  let role = queryParams.get('role');
  let user_id = queryParams.get('user_id');
  console.log(queryParams)
  const [subs, setSubs] = useState([]);
  const [realData, setRealData] = useState([])
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        const response = await axios.get('http://54.235.43.83:8012/subscription/full', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        const array_input = result.flatMap(innerArray => innerArray);

        const resultArray = array_input.map(innerArray => {
          const resultObject = {};
          innerArray.forEach((value, index) => {
              const key = keyMappings[index];
              resultObject[key] = value;
          });
          return resultObject
        });

        console.log("resultArray", resultArray)
        const int_user_id = parseInt(user_id, 10);
        const filteredData = resultArray.filter(item => item.subscriber_id === int_user_id);

        setRealData(filteredData)
  
      } catch (error) {
          console.error('Error during GET subscription/full:', error);
      }
    }
    fetchData();
  },[]);

  const handleSubmit = async () => {
    navigate('/Search')
};


  return (
    <div className="App">
      <header className="Page-header">
        <h1>User Profile:</h1>
        <h2>Name: {name}</h2>
        <h2>Email: {email}</h2>
        <h2>Role: {role}</h2>
        <h2>User ID: {user_id}</h2>
        <div className='App-container'>
          <SubscriptionTable data={realData}/>
        </div>
        <div>
          <Button label="Search for More Reports" onClick={handleSubmit}></Button>
        </div>
      </header>
    </div>
  );
}

export default User;