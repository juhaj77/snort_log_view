import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import './App.css';
import Alert from './Alert';

function Alerts() {

  const [alertsArray, setAlertsArray] = useState([])

  const callServer = async () => {
    await fetch("http://localhost:9000/alerts")
        .then(res => res.text())
        .then(res => {
          setAlertsArray(JSON.parse(res))})
        .catch(err => err);
        
        setTimeout(() => callServer(), 5000);
  }

  useEffect(() => {
    callServer()
  },[])

  return alertsArray.length === 0 ? <Loading text='loading...'/> :
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
}

export default Alerts;
