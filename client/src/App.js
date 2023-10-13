import React, { useState } from 'react'
import './App.css';
import Alerts from './Alerts';
import AppIds from './AppIds';
import Search from './Search';
import Perf from './Perf';

const Tabs = ({onClick,show}) => {
  switch(show) {
    case 'ALERTS': return (
      <div className="tabs">
        <div className="active">ALERTS</div>
        <div className="passive" onClick={() => onClick('APPID')}>APPID</div>
        <div className="passive" onClick={() => onClick('SEARCH')}>SEARCH</div>
        <div className="passive" onClick={() => onClick('PERF')}>PERF</div>
      </div>)
   case 'APPID': 
    return (
      <div className="tabs">
        <div className="passive" onClick={() => onClick('ALERTS')}>ALERTS</div>
        <div className="active">APPID</div>
        <div className="passive" onClick={() => onClick('SEARCH')}>SEARCH</div>
        <div className="passive" onClick={() => onClick('PERF')}>PERF</div>
      </div>)
  
  case 'SEARCH': 
    return (
      <div className="tabs">
        <div className="passive" onClick={() => onClick('ALERTS')}>ALERTS</div>
        <div className="passive" onClick={() => onClick('APPID')}>APPID</div>
        <div className="active">SEARCH</div>
        <div className="passive" onClick={() => onClick('PERF')}>PERF</div>
      </div>)
     case 'PERF': 
     return (
       <div className="tabs">
         <div className="passive" onClick={() => onClick('ALERTS')}>ALERTS</div>
         <div className="passive" onClick={() => onClick('APPID')}>APPID</div>
         <div className="passive" onClick={() => onClick('SEARCH')}>SEARCH</div>
         <div className="active">PERF</div>
       </div>)
  }
}

const App = () => {
  const [show, setShow] = useState('ALERTS')
  switch(show) {
  case 'ALERTS':
    return (
    <div style={{width:'100%'}}>
      <Tabs onClick={setShow} show={show}/>
      <Alerts/>
   </div>
  )
  case 'APPID':
    return (
    <div style={{width:'100%'}}>
      <Tabs onClick={setShow} show={show}/>
      <AppIds/>
   </div>)
  case 'SEARCH':
    return (
    <div style={{width:'100%'}}>
      <Tabs onClick={setShow} show={show}/>
      <Search/>
   </div>)
   case 'PERF':
    return (
    <div style={{width:'100%'}}>
      <Tabs onClick={setShow} show={show}/>
      <Perf/>
   </div>)
  }
}

export default App;
