import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Button from './Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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


const Search = () => {
  const [inputValueSub, setInputValueSub] = useState('');
  const [inputValueUnSub, setInputValueUnSub] = useState('');
  const [realData, setRealData] = useState([]);
  const navigate = useNavigate;

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        const response = await axios.get('http://54.235.43.83:8012/subscription/?page_num=2&page_size=2', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        const array_input = result.data

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
    console.log("Submit Success!")
};
  

  return (
    <div className="App">
      <header className="Page-header">
        <h2>Search Reports w/ Pagination: </h2>
        <div className='App-container'>
          <SubscriptionTable data={realData}/>
        </div>
        <div>
          <Link to="/SearchAll">
            <Button label="View All Search Results"></Button>          
          </Link>
        </div>
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
      </header>
    </div>
  );
}

export default Search;