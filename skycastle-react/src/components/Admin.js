import React from 'react';
import { createContext, useContext, useState } from 'react';
import './App.css';
import Home from './Home';

const sampleData = [
  {user_cnt: 100, report_cnt: 1000, sub_cnt: 1000000},,
];

const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Total # Users</th>
          <th>Total # Reports</th>
          <th>Total # Subs</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.user_cnt}>
            <td>{item.user_cnt}</td>
            <td>{item.report_cnt}</td>
            <td>{item.sub_cnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const Admin = () => {
  return (
    <div className="App">
      <header className="Page-header">
        <h2>Admin Statistics: </h2>
          <div className='App-container'>
            <SubscriptionTable data={sampleData}/>
          </div>
      </header>
    </div>
  );
}

export default Admin;