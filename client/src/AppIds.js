import React, { useState, useEffect } from 'react'
import './App.css';
import AppId from './AppId';

function AppIds() {

  const [appIdArray, setAppIdArray] = useState([])

  const callServer = async () => {
    await fetch("http://localhost:9000/appids")
        .then(res => res.text())
        .then(res => setAppIdArray(JSON.parse(res)))
        .catch(err => err);
        setTimeout(() => callServer(), 1000)
  }

  useEffect(() => {
    callServer()
  },[])

  return (
    <div className="App">
      <table className="App-header">
        <tbody>
          <tr style={{backgroundColor:'black'}}>
            <th>session</th>
            <th>pkt time</th>
            <th>service</th>
            <th>client</th>
            <th>proto</th>
            <th>client ip</th>
            <th>port</th>
            <th>service ip</th>
            <th>port</th>
            <th>DNS host</th>
            <th>TLS host</th>
          </tr>
          {appIdArray.map((e,k) => <AppId key={e.pkt_time+k} json={e} />)}
        </tbody>
      </table>
    </div>
  );
}

export default AppIds;
