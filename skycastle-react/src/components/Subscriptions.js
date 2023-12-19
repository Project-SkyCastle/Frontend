import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

const data_sample = [
    { id: 1, courseCode: "COMS4170", courseName: "User Interface Design", name: "Brian Smith", ratings: [3,3,5,1] },
    { id: 2, courseCode: "COMS4170", courseName: "User Interface Design", name: "Brian Smith", ratings: [4,1,2,2] },
    { id: 3, courseCode: "COMS4170", courseName: "User Interface Design", name: "Brian Smith", ratings: [1,4,4,3]},
    { id: 4, courseCode: "CSOR4170", courseName: "Machine Learning", name: "Nakul Verma", ratings: [3,3,5,1] },
    { id: 5, courseCode: "CSOR4170", courseName: "Machine Learning", name: "Nakul Verma", ratings: [1,4,1,3] },
    { id: 6, courseCode: "EEES4230", courseName: "Natural Language Processing", name: "Daniel Bauer", ratings: [4,1,2,5] },
    { id: 7, courseCode: "EEES4710", courseName: "Cloud Computing", name: "Tony Dear", ratings: [1,4,4,4]},
  ];

  const sampleData = {
    name: 'John Doe',
    age: 25,
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