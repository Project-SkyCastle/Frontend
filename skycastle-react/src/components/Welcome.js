import React from 'react';
import { createContext, useContext, useState } from 'react';
import './App.css';
import Home from './Home';


function Welcome() {
  const [dataToSend, setDataToSend] = useState();
  const [showHome, setShowHome] = useState(false);

  const updateHeader = (data) => {
    setDataToSend(data);
    console.log("Data received from Login component:", data);
  };

  return (
    <div className="Appp">
      <header className="App-header">
        <h1>User Profile: {dataToSend}</h1>
        <Home passedData={dataToSend} />
      </header>
      {showHome && <Home sendData={updateHeader} />}
    </div>
  );
}

export default Welcome;