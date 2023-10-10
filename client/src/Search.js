import React, { useState, useEffect } from 'react'
import Loading from './Loading'
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
    let d1 = new Date(startString)
    let d2 = new Date(endString)
    let inv1 = d1.toDateString() === "Invalid Date"
    let inv2 = d2.toDateString() === "Invalid Date"

    //This is for Chrome
    if(!inv1 && d1.getUTCFullYear() === 2001) d1.setUTCFullYear(date.getUTCFullYear())
    if(!inv2 && d2.getUTCFullYear() === 2001) d2.setUTCFullYear(date.getUTCFullYear())

    if(inv1 && startString !== ''){
      const dt = startString.split('-')
      const d = dt[0].split('/')
      const standard = date.getUTCFullYear(date)+'-'+d[0]+'-'+d[1]+'T'+dt[1]
      d1 = new Date(standard)
      inv1 = d1.toDateString() === "Invalid Date"
    }

    if(inv2 && endString !== ''){
      const dt = endString.split('-')
      const d = dt[0].split('/')
      const standard = date.getUTCFullYear(date)+'-'+d[0]+'-'+d[1]+'T'+dt[1]
      d2 = new Date(standard)
      inv2 = d2.toDateString() === "Invalid Date"
    }

    if(!inv1 && !inv2){
      setAlertsToShow(alertsArray.filter((alert) => alert.seconds >= d1.getTime()/1000 && alert.seconds <= d2.getTime()/1000))
    } else if(!inv1 && inv2){
      setAlertsToShow(alertsArray.filter((alert) => alert.seconds >= d1.getTime()/1000))
    } else if(inv1 && !inv2){
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

  const sortByRarity = () => {
    const eventsByType = alertsToShow.reduce((alarms,alarm) => {
      alarms[alarm['rule']] = alarms[alarm['rule']] || []
      alarms[alarm['rule']].push({...alarm})
      return alarms
    }, {})
    let grouped = Object.values(eventsByType)
    grouped.sort((A,B) => A.length > B.length ? 1 : -1)
    let result = []
    grouped.forEach(subarray => {
      subarray.forEach(alert => {
        result.push(alert)
      })
    })
    setAlertsToShow(result)
  }

  return alertsToShow.length === 0 ? <Loading text='loading...'/> : 
    <div className="App-header">
      <div style={{
        marginTop:"1.5em",
        alignItems:"start"}}>
      <div className="search">
        <span className="date">start date:</span>
        <div className="tooltip">
          <input value={startString} onChange={(event) => setStartString(event.target.value)}/>
          <span className="tooltiptext">
            &#160;&#160;&#160;YYYY-MM-DDTHH:mm:ss <span style={{color:"red"}}>or</span> MM/DD-HH:mm:ss&#160;&#160;&#160;
          </span>
        </div>
        <span className="date">end date:</span>
        <div className="tooltip">
          <input value={endString} onChange={(event) => setEndString(event.target.value)}/>
          <span className="tooltiptext">
            &#160;&#160;&#160;YYYY-MM-DDTHH:mm:ss <span style={{color:"red"}}>or</span> MM/DD-HH:mm:ss&#160;&#160;&#160;
          </span>
        </div>
        <button onClick={filterByDate}>:submit</button>
        <select className="dropdown" onChange={event => updateMode(event.target.value)}>
          <option value="search">search:</option>
          <option value="reject">reject:</option>
        </select>
        <input value={filter} onChange={event => filterAlerts(event.target.value,mode)} style={{width:"100%"}} ></input>
        <div className="tooltip">
          <button onClick={sortByRarity}>R</button>
          <span className="tooltiptext">&#160;&#160;&#160;sort by rarity&#160;&#160;&#160;</span>
        </div>
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
}

export default Search;