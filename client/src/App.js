import React, { useState } from 'react'
import './App.css';
import Alerts from './Alerts';
import AppIds from './AppIds';
import Search from './Search';

const Tabs = ({onClick,show}) => {
  switch(show) {
    case 'ALERTS': return (
      <div style={{display:'inline-flex'}}>
        <div className="active">ALERTS</div>
        <div className="passive" onClick={() => onClick('APPID')}>APPID</div>
        <div className="passive" onClick={() => onClick('SEARCH')}>SEARCH</div>
      </div>)
   case 'APPID': 
    return (
      <div style={{display:'inline-flex'}}>
        <div className="passive" onClick={() => onClick('ALERTS')}>ALERTS</div>
        <div className="active">APPID</div>
        <div className="passive" onClick={() => onClick('SEARCH')}>SEARCH</div>
      </div>)
  
  case 'SEARCH': 
    return (
      <div style={{display:'inline-flex'}}>
        <div className="passive" onClick={() => onClick('ALERTS')}>ALERTS</div>
        <div className="passive" onClick={() => onClick('APPID')}>APPID</div>
        <div className="active">SEARCH</div>
      </div>)
  }
}


const App = () => {
  const [show, setShow] = useState('ALERTS')
  switch(show) {
  case 'ALERTS':
    return (
    <div>
      <Tabs onClick={setShow} show={show}/>
      <Alerts/>
   </div>
  )
  case 'APPID':
    return (
    <div>
      <Tabs onClick={setShow} show={show}/>
      <AppIds/>
   </div>)
  case 'SEARCH':
    return (
    <div>
      <Tabs onClick={setShow} show={show}/>
      <Search/>
   </div>)
  }
}

export default App;
