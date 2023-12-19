import React from 'react';
import { createContext, useContext, useState } from 'react';
import './App.css';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const sampleData = [
  {subscription_id: 'ABCD1', sub_text: "Stock is up!", analyst: 'John Smith'},
  {subscription_id: 'ABCD2', sub_text: "Stock is down!", analyst: 'John Doe'},
];

const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Subscription ID</th>
          <th>Subscription Text</th>
          <th>Analyst</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.subscription_id}>
            <td>{item.subscription_id}</td>
            <td>{item.sub_text}</td>
            <td>{item.analyst}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const User = () => {
  const [name, setName] = useState("John Doe");
  const [role, setRole] = useState("Subscriber");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate('/Search')
};


  return (
    <div className="App">
      <header className="Page-header">
        <h1>User Profile:</h1>
        <h2>Name: </h2>
        <h2>Role: </h2>
        <h2>My Reports: </h2>
        <div className='App-container'>
          <SubscriptionTable data={sampleData}/>
        </div>
        <div>
          <Button label="Search for More Reports" onClick={handleSubmit}></Button>
        </div>
      </header>
    </div>
  );
}

export default User;