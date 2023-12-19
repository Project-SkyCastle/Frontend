import React from 'react';
import { createContext, useContext, useState } from 'react';
import './App.css';
import Home from './Home';
import Button from './Button';

const sampleData = [
  {report_id: 'ABCD1', report_text: "Stock is up!", sub_count: 99},
  {report_id: 'ABCD2', report_text: "Stock is down!", sub_count: 1000}
];

const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Report ID</th>
          <th>Report Text</th>
          <th>Number of Subs</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.report_id}>
            <td>{item.report_id}</td>
            <td>{item.report_text}</td>
            <td>{item.sub_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const Analyst = () => {
  const [name, setName] = useState("John Doe");
  const [role, setRole] = useState("Subscriber");

  const handleSubmit = async () => {
      console.log("Submit Success!")
  };


  return (
    <div className="App">
      <header className="Page-header">
        <h1>Analyst Profile:</h1>
        <h2>Name: </h2>
        <h2>Role: </h2>
        <h2>Reports: </h2>
          <div className='App-container'>
            <SubscriptionTable data={sampleData}/>
          </div>
          <h2>Create a New Report:</h2>
          <textarea
            placeholder="Write Report Here"
            rows={10} 
          />
          <div>
            <Button label="Submit" onClick={handleSubmit}></Button>
          </div>
      </header>
    </div>
  );
}

export default Analyst;