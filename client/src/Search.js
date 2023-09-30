import React, { useState, useEffect } from 'react'
import './App.css';
import Alert from './Alert';

function Search() {

  const [alertsArray, setAlertsArray] = useState([])
  const [alertsToShow, setAlertsToShow] = useState([])
  const [startString, setStartString] = useState('')
  const [endString, setEndString] = useState('')
  const [mode, setMode] = useState('search')
  const [filter, setFilter] = useState('')

  const callServer = async () => {
    await fetch("http://localhost:9000/alerts_all")
        .then(res => res.text())
        .then(res => {
          setAlertsArray(JSON.parse(res))
          setAlertsToShow(JSON.parse(res))
        })
        .catch(err => err);
  }
  const sortAlerts = (sorter) => {
    let clone = [...alertsToShow]
    clone.sort((a,b) => a[sorter] > b[sorter] ? 1 : -1)
    setAlertsToShow(clone)
  }

  const updateMode = (newMode) => {
    setMode(newMode)
    filterAlerts(filter,newMode)
  }

  useEffect(() => {
    callServer()
  },[])

  const filterByDate =() => {
    setFilter('')
    const date = new Date()
    const d1 = new Date(startString)
    const d2 = new Date(endString)
    const inv1 = d1.toDateString() === "Invalid Date"
    const inv2 = d2.toDateString() === "Invalid Date"
    if(!inv1 && !inv2){
      d1.setUTCFullYear(date.getUTCFullYear())
      d2.setUTCFullYear(date.getUTCFullYear())
      setAlertsToShow(alertsArray.filter((alert) => alert.seconds >= d1.getTime()/1000 && alert.seconds <= d2.getTime()/1000))
    } else if(!inv1 && inv2) {
      d1.setUTCFullYear(date.getUTCFullYear())
      setAlertsToShow(alertsArray.filter((alert) => alert.seconds >= d1.getTime()/1000))
    } else if(inv1 && !inv2){
      d2.setUTCFullYear(date.getUTCFullYear())
      setAlertsToShow(alertsArray.filter((alert) => alert.seconds <= d2.getTime()/1000
      ))
    } else {
      setAlertsToShow(alertsArray)
    }
  }
  const filterAlerts = (str,mod) => {
    setFilter(str)
    setStartString('')
    setEndString('')
    if(mod === 'search') setAlertsToShow(alertsArray.filter(alert => alert.msg.indexOf(str) !== -1 || alert.class.indexOf(str) !== -1))
    if(mod === 'reject') setAlertsToShow(alertsArray.filter(alert => alert.msg.indexOf(str) === -1 && alert.class.indexOf(str) === -1))
    if(str === '') setAlertsToShow(alertsArray)
  }

  return (
    <div className="App-header">
      <div style={{
        marginTop:"1.5em",
        alignItems:"start"}}>
      <div style={{
        backgroundColor:"black",
        width:"100%",
        display:'inline-flex',
        marginBottom:"0.5em"}}>
        <span style={{
          paddingLeft:"1em",
          paddingRight:"1em",
          whiteSpace:"nowrap"
          }}>start date:</span>
        <input value={startString} onChange={(event) => setStartString(event.target.value)}/>
        <span style={{
          paddingLeft:"1em",
          paddingRight:"1em",
          whiteSpace:"nowrap"
          }}>end date:</span>
        <input value={endString} onChange={(event) => setEndString(event.target.value)}/>
        <button onClick={filterByDate}>:submit</button>
        <select onChange={event => updateMode(event.target.value)} style={{
          paddingLeft:"1em",
          backgroundColor:"black",
          color:"white",
          whiteSpace:"nowrap"
          }}>
          <option value="search">search:</option>
          <option value="reject">reject:</option>
        </select>
        <input value={filter} onChange={event => filterAlerts(event.target.value,mode)} style={{width:"100%"}} ></input>
      </div>
      <table >
        <tbody>
          <tr style={{backgroundColor:'#0f0f0f'}}>
            <td className="sort" onClick={() => sortAlerts('timestamp')}>timestamp</td>
            <td className="sort" onClick={() => sortAlerts('priority')}>P</td>
            <td className="sort" onClick={() => sortAlerts('rule')}>rule</td>
            <td className="sort" onClick={() => sortAlerts('proto')}>proto</td>
            <td className="sort" onClick={() => sortAlerts('src_ap')}>source</td>
            <td className="sort" onClick={() => sortAlerts('dst_ap')}>destination</td>
            <td className="sort" onClick={() => sortAlerts('msg')}>alert message</td>
            <td className="sort" onClick={() => sortAlerts('class')}>classification</td>
          </tr>
          {alertsToShow.map((e) => <Alert key={e.timestamp+Math.random()} json={e} />)}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Search;