import React from 'react'

const Loading = ({text}) => 
<div style={{width:'100vw',height:'100vh',background:'black'}}>
  <span style={{position:'absolute',top:'50%',left:'50%',fontSize:'2em',color:'#b29966',marginLeft:'-5rem'}}>
  {text}
  </span>
</div>

export default Loading