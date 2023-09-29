import React from 'react'
 

const AppId = ({json}) => {
  //const [response, setResponse] = useState({})
  
 
    return (
      <tr style={{backgroundColor:'#2f2537', fontSize:'11px'}}>
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
  )
}

export default AppId;