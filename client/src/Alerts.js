import React, { useState, useEffect } from 'react'
import './App.css';
import Alert from './Alert';

function Alerts() {

  const [alertsArray, setAlertsArray] = useState([])

  //const [sortBy, setSortBy] = useState({"timestamp":1})
  const callServer = async () => {
    await fetch("http://localhost:9000/alerts")
        .then(res => res.text())
        .then(res => setAlertsArray(JSON.parse(res)))
        .catch(err => err);
        
        setTimeout(() => callServer(), 5000);
  }

  useEffect(() => {
    callServer()
  },[])

  return (
    <div className="App">
      <table className="App-header">
        <tbody>
          <tr style={{backgroundColor:'black'}}>
            <th>timestamp</th>
            <th>P</th>
            <th>rule</th>
            <th>proto</th>
            <th>source</th>
            <th>destination</th>
            <th>alert message</th>
            <th>classification</th>
          </tr>
          {alertsArray.map((e) => <Alert key={e.timestamp} json={e} />)}
        </tbody>
      </table>
    </div>
  );
}

export default Alerts;
