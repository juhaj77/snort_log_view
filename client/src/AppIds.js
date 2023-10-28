import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import StyledSpinner from './StyledSpinner'
import './App.css';
import AppId from './AppId';

const socket = io('ws://localhost:3009')

function AppIds() {

  const [appIdArray, setAppIdArray] = useState([])
  const [count, setCount] = useState(0)
  const count3 = useRef(0)
  let array = []
 
  useEffect(() => {
    socket.on('json', data => {
      setCount(count => count + 1)
      if(array.length == 0) {
        count3.current = 1
        data.count = count3.current
        array.push(data)
      }
      else if(array[array.length-1].pkt_time != data.pkt_time) {
        count3.current = count3.current + 1
        data.count = count3.current
        array.push(data)
        if(array.length > 40) array.shift()
        setAppIdArray([...array])
      }
    })
  },[])

  return appIdArray.length === 0 ? <StyledSpinner/> :
    <div className="App">
      <table className="mytable" style={{paddingTop:'2em',fontSize:'11px'}}>
        <tbody>
          <tr style={{backgroundColor:'black'}}>
            <th style={{width:'5em'}}>count</th>
            <th>session</th>
            <th>pkt time</th>
            <th style={{width:'5em'}}>service</th>
            <th style={{width:'5em'}}>client</th>
            <th>proto</th>
            <th style={{width:'8em'}}>client ip</th>
            <th style={{width:'4em'}}>port</th>
            <th style={{width:'8em'}}>service ip</th>
            <th style={{width:'4em'}}>port</th>
            <th style={{width:'15em'}}>DNS host</th>
            <th style={{width:'15em'}}>TLS host</th>
          </tr>
          {appIdArray.map((e,k) => <AppId key={e.pkt_time+k} count={count} json={e} />)}
        </tbody>
      </table>
    </div>
  
}

export default AppIds;
