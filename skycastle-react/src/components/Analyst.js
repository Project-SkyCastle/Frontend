import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Button from './Button';
import axios from 'axios';

const sampleData = [
  {report_id: 'ABCD1', report_text: "Stock is up!", sub_count: 99},
  {report_id: 'ABCD2', report_text: "Stock is down!", sub_count: 1000}
];

/*
 {
        "report_id": 1,
        "title": "the first title",
        "analyst_id": "1",
        "content": "first report content",
        "feedback": " first report feedback",
        "subscribers": [
            "2",
            "3"
        ]
    },
*/

const SubscriptionTable = ({ data }) => {
  return (
    <table className="subscription-table">
      <thead>
        <tr>
          <th>Report ID</th>
          <th>Report Title</th>
          <th>Analyst ID</th>
          <th>Content</th>
          <th>Feedback</th>
          <th>List of Sub ID's</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.report_id}>
            <td>{item.report_id}</td>
            <td>{item.title}</td>
            <td>{item.analyst_id}</td>
            <td>{item.content}</td>
            <td>{item.feedback}</td>
            <td>{item.subscribers}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const Analyst = (props) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.state);
  let email = queryParams.get('email');
  let name = queryParams.get('name');
  let role = queryParams.get('role');
  let user_id = queryParams.get('user_id');
  console.log(queryParams)
  const [realData, setRealData] = useState([])

  useEffect(() =>{
    const fetchData = async(e) => {
      try {
        const response = await axios.get('http://35.221.53.203:8012/reports', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        const result = response.data
        console.log(result)
        setRealData(result)
  
      } catch (error) {
          console.error('Error during GET subscription/full:', error);
      }
    }
    fetchData();
  },[]);


  const handleSubmit = async () => {
      console.log("Submit Success!")
  };


  return (
    <div className="App">
      <header className="Page-header">
        <h1>Analyst Profile:</h1>
        <h2>Name: {name}</h2>
        <h2>Email: {email}</h2>
        <h2>Role: {role}</h2>
        <h2>Analyst ID: {user_id}</h2>
        <h2>All Reports: </h2>
          <div className='App-container'>
            <SubscriptionTable data={realData}/>
          </div>
          <h2>Create a New Report:</h2>
          <textarea
            placeholder=" Write New Report Here! {analyst_id: (), content: (), feedback: ()}"
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