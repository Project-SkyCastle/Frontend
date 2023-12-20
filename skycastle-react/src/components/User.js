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

// subscription_id[DataType(=row[0], subscriber_id=row[1], analyst_id=row[2], report_id=row[3], 
// subscription_date=row[4], feedback=row[5], notification=row[6], activity=row[7]) 
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


const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Subscription ID</th>
          <th>Subscriber ID</th>
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
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        const response = await axios.get('http://54.242.146.56:8012/subscription/full', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data[0][0]
        const mappedObject = Object.fromEntries(keys.map((key, index) => [key, result[index]]));
        console.log(mappedObject)
        setSubs([mappedObject])

  
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
          <SubscriptionTable data={subs}/>
        </div>
        <div>
          <Button label="Search for More Reports" onClick={handleSubmit}></Button>
        </div>
      </header>
    </div>
  );
}

export default User;