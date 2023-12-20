import React from 'react';
import { Link } from "react-router-dom";
import './App.css';


  const sampleData = {
    subscription_id: 'John Doe',
    notification_freq: 25,
    occupation: 'Developer',
    location: 'Cityville',
  };

  const DataTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

function Subscriptions() {
  return (
    <div className="App">
      <header className="Page-header">
        <h1>Subscriber Hompage:</h1>
        <DataTable data={sampleData} />
      </header>
    </div>
  );
}

export default Subscriptions;