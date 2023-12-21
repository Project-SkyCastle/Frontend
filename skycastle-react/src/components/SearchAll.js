import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Button from './Button';
import axios from 'axios';

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


const SearchAll = () => {
  const [inputValueSub, setInputValueSub] = useState('');
  const [inputValueUnSub, setInputValueUnSub] = useState('');
  const [realData, setRealData] = useState([])

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        const response = await axios.get('http://54.242.52.198:8012/subscription/full', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        const array_input = result.flatMap(innerArray => innerArray);

        console.log(result)

        const resultArray = array_input.map(innerArray => {
          const resultObject = {};
          innerArray.forEach((value, index) => {
              const key = keyMappings[index];
              resultObject[key] = value;
          });
          return resultObject;
        });

        setRealData(resultArray)

  
      } catch (error) {
          console.error('Error during GET subscription/full:', error);
      }
    }
    fetchData();
  },[]);

  const handleSub = (event) => {
    setInputValueSub(event.target.value);
  };

  const handleUnSub = (event) => {
    setInputValueUnSub(event.target.value);
  };
  
  const handleSubmit = async () => {
    console.log('handleSumbit id here')
  };

  return (
    <div className="App">
      <header className="Page-header">
        <h2>Search All Reports: </h2>
        <div>
          <input 
            className='labelarea'
            type="text"
            placeholder="Enter Subscription ID to subscribe here"
            value={inputValueSub}
            onChange={handleSub}
          />
          <div>
              <Button label="Subscribe" onClick={handleSubmit}></Button>
          </div>
          <input
            className='labelarea'
            type="text"
            placeholder="Enter Subscription ID to unsubscribe here"
            value={inputValueUnSub}
            onChange={handleUnSub}
          />
          <div>
              <Button label="Unsubscribe" onClick={handleSubmit}></Button>
          </div>
        </div>
            <div className='App-container'>
              <SubscriptionTable data={realData}/>
            </div>
      </header>
    </div>
  );
}

export default SearchAll;