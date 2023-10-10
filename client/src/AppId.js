import React from 'react'


const AppId = ({json}) => {
   // const [shadow ,setShadow] = useState('0px '+textShadow+'px '+textShadow+'px white')
   // console.log(shadow)
    return (
      json.apps.service == 'unknown' ? 
      <tr style={{whiteSpace:'nowrap',backgroundColor:'#4d2629', fontSize:'11px'}}>
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
      : 
      <tr style={{whiteSpace:'nowrap',backgroundColor:'#2f2537', fontSize:'11px'}}>
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
  )
}

export default AppId;