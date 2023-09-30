import React, { useState } from 'react'
import './App.css';
import Alerts from './Alerts';
import AppIds from './AppIds';
import Search from './Search';

const Tabs = ({onClick,show}) => {
  switch(show) {
    case 'ALERTS': return (
      <div style={{display:'inline-flex'}}>
        <div style={{paddingLeft:'2em',paddingRight:'2em',background:'#303641',color:'white'}}>ALERTS</div>
        <div onClick={() => onClick('APPID')} style={{borderLeft:"solid 1px #303641",paddingLeft:'2em',paddingRight:'2em',background:'#595c62',color:'white'}}>APPID</div>
        <div onClick={() => onClick('SEARCH')} style={{borderLeft:"solid 1px #303641", paddingLeft:'2em',paddingRight:'2em',background:'#595c62',color:'white'}}>SEARCH</div>
      </div>)
   case 'APPID': 
    return (
      <div style={{display:'inline-flex'}}>
        <div onClick={() => onClick('ALERTS')} style={{paddingLeft:'2em',paddingRight:'2em',background:'#595c62',color:'white'}}>ALERTS</div>
        <div style={{paddingLeft:'2em',paddingRight:'2em',background:'#303641',color:'white'}}>APPID</div>
        <div onClick={() => onClick('SEARCH')} style={{borderLeft:"solid 1px #303641",paddingLeft:'2em',paddingRight:'2em',background:'#595c62',color:'white'}}>SEARCH</div>
      </div>)
  
  case 'SEARCH': 
    return (
      <div style={{display:'inline-flex'}}>
        <div onClick={() => onClick('ALERTS')} style={{paddingLeft:'2em',paddingRight:'2em',background:'#595c62',color:'white'}}>ALERTS</div>
        <div onClick={() => onClick('APPID')} style={{borderLeft:"solid 1px #303641",paddingLeft:'2em',paddingRight:'2em',background:'#595c62',color:'white'}}>APPID</div>
        <div style={{paddingLeft:'2em',paddingRight:'2em',background:'#303641',color:'white'}}>SEARCH</div>
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
