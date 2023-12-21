import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Button from './Button';
import axios from 'axios';

const sampleData = [
  {subscription_id: 'ABCD1', sub_text: "Stock is up!", analyst: 'John Smith', feedback: 'Red Flag'},
  {subscription_id: 'ABCD2', sub_text: "Stock is down!", analyst: 'John Doe', feedback: 'Green Flag'},
  {subscription_id: 'ABCD1', sub_text: "Stock is up!", analyst: 'John Smith', feedback: 'Must see'},
  {subscription_id: 'ABCD2', sub_text: "Stock is down!", analyst: 'John Doe', feedback: 'Ignore'},
];

const SubscriptionTable = ({ data }) => {

  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Subscription ID</th>
          <th>Content</th>
          <th>Analyst</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.subscription_id}>
            <td>{item.subscription_id}</td>
            <td>{item.sub_text}</td>
            <td>{item.analyst}</td>
            <td>{item.feedback}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const Search = () => {
  const [inputValueSub, setInputValueSub] = useState('');
  const [inputValueUnSub, setInputValueUnSub] = useState('');
  const [realData, setRealData] = useState([])

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        const response = await axios.get('http://54.242.146.56:8012/subscription?page_num=2&page_size=2', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        console.log(result)
        const textContent = result.join(', ');
        setRealData(textContent)

  
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
        <h2>Search Reports: </h2>
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
              <SubscriptionTable data={sampleData}/>
            </div>
            <h2>Raw Pagination: </h2>
            <div>
              <p>{realData}</p>
            </div>
      </header>
    </div>
  );
}

export default Search;