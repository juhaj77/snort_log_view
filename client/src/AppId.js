import React, { useState } from 'react'

const AppIdRow = ({json,onClick}) => {
  const className = json.apps.service == 'unknown' ? 'unknown' : 'appid'
  return <tr className={className} onClick={onClick}>
  <td>{json.count}</td>
  <td>{json.session_num}</td>
  <td>{json.pkt_time}</td>
  <td>{json.apps.service}</td>
  <td>{json.apps.client}</td>
  <td>{json.proto}</td>
  <td>{json.client_info.ip}</td>
  <td>{':'+json.client_info.port}</td>
  <td>{json.service_info.ip}</td>
  <td>{':'+json.service_info.port}</td>
  <td>{json.dns_host}</td>
  <td>{json.tls_host}</td>
  </tr> 
}

const AppId = ({json}) => {
  const [showDetails, setShowDetails] = useState(false) 
 
  const d = json.pkt_time.split(' ')
  const date = new Date(d[0]+'T'+d[1])
  const dt = date.toDateString().split(' ')
  const stamp = d[1].split('.')[1]
  const f = (parseFloat('0.'+stamp)+0.000001).toFixed(6)
  const stamp2 = f.toString().split(".")[1]
  const filter = 'frame.time >= "'+dt[1]+' '+dt[2]+', '+dt[3]+' '+d[1]+
  '" && frame.time <= "'+dt[1]+' '+dt[2]+', '+dt[3]+
  ' ' +d[1].split('.')[0]+'.'+stamp2+'"'
  
  const handleClick = () => {
    setShowDetails(showDetails ? false : true)
  }
  return showDetails ? 
  <>
   <AppIdRow  onClick={handleClick} json={json}/>
    <tr>
      <td colSpan='9' className='details'>find with Wireshark:<br/>
          <span style={{
            fontSize:12,
            fontWeight:'bolder',
            color:'#38fcff'}}>{filter}</span><br/><br/>
      </td>
    </tr>
  </>
  : <AppIdRow  onClick={handleClick} json={json}/>
}

export default AppId;