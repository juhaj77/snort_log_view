import React, { useState } from 'react'

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
  
  return showDetails ?
    <>
      <Row className={bg} onClick={handleClick} json={json}/>
      <tr>
        <td colSpan='7' className='details'>
          find with Wireshark:<br/>
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
  : <Row className={bg} onClick={handleClick} json={json}/>
}

export default Alert;