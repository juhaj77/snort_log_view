import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Row = ({className,onClick,json}) =>  
  <tr className={className} onClick={onClick}>
  <td>{json.timestamp}</td>
  <td>{json.priority}</td>
  <td>{json.rule}</td>
  <td>{json.proto}</td>
  <td>{json.src_ap}</td>
  <td>{json.dst_ap}</td>
  <td>{json.msg}</td>
  <td>{json.class}</td>
  </tr>

const Alert = ({json}) => {
  //const [response, setResponse] = useState({})
  const [showDetails, setShowDetails] = useState(false) 
  const bg = 'A'+json.priority
  const details = [] 
  for (const [key, value] of Object.entries(json)) { 
    details.push([key, value]); 
  }
  const d = new Date(json.seconds*1000)
  const d_array = d.toString().split(" ")
  const stamp = json.timestamp.split(".")
  const f = (parseFloat('0.'+stamp[1])+0.000001).toFixed(6)
  const stamp2 = f.toString().split(".")
  const filter = 'frame.time >= "'+d_array[1]+' '+d_array[2]+', '+d_array[3]+
  ' '+d_array[4]+'.'+stamp[1]+'" && frame.time <= "'+d_array[1]+' '+d_array[2]+
  ', '+d_array[3]+' '+d_array[4]+'.'+stamp2[1]+'"'

  const handleClick = () => {
    setShowDetails(showDetails ? false : true)
  }
  if(!showDetails){
    return (
      <Row className={bg} onClick={handleClick} json={json}/>
  )} else {
    return (
      <>
      <Row className={bg} onClick={handleClick} json={json}/>
      <tr>
        <td colSpan='7' style={{
          background:'black',
          textAlign:'left',
          paddingLeft:'4em',
          paddingTop:'1em',
          paddingBottom:'1em'}}>find with Wireshark:<br/>
          <span style={{
            fontSize:12,
            fontWeight:'bolder',
            color:'#38fcff'}}>{filter}</span><br/><br/>
            <table style={{borderCollapse:"collapse"}}>
                <tbody>
                {details.map((item,i) => 
                  <tr style={{background:'black'}} key={i}>
                    <td style={{fontWeight:'bolder',
                                color:'red',
                                borderColor:"black"}}>{item[0]+':'}</td>
                    <td style={{borderColor:'black'}}>{item[1]}</td></tr>)}
                </tbody>
            </table>
        </td>
      </tr>
      </>
  )}
}

export default Alert;