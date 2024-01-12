import React, { useState, useEffect, useRef } from 'react'
import StyledSpinner from './StyledSpinner'
import './App.css';

function Perf() {

    const [perfObject, setPerfObject] = useState({})
    const perf = useRef()
    const timeoutId = useRef(-1)

    const callServer = async () => {
        await fetch("http://localhost:9000/perf")
            .then(async res => await res.text())
            .then(async res => {
                const resp = await JSON.parse(res)
                perf.current = resp.map(l => l.split(','))
                let hellishObject = {}
                for(let i = 0; i < perf.current[0].length; i++){
                    hellishObject[perf.current[0][i]] = []
                    for(let j = 1; j < perf.current.length; j++){
                        if(!isNaN(perf.current[j][i])) hellishObject[perf.current[0][i]].push(perf.current[j][i])
                    } 
                }
                for(const key of Object.keys(hellishObject)){
                    if(hellishObject[key].length > 0 && hellishObject[key].reduce((sum,value) => sum + value,0) == 0)
                        delete hellishObject[key]
                }
                setPerfObject(hellishObject)
            })
        .catch(err => console.log(err));
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(callServer,60000)
  }

  useEffect(() => {
   callServer()
   return () => clearTimeout(timeoutId.current)
  },[])

  const convertTime = (seconds) => {
    const date = new Date(seconds*1000)
    const time = date.toTimeString().split(' ')
    return (date.getMonth()+1)+'/'+date.getDate()+'-'+time[0]
  }

  return Object.keys(perfObject).length === 0 ? <StyledSpinner/> :
    <div className='perf'>
        <table>
            <tbody>
            {Object.keys(perfObject).map(key => <tr key={Math.random()}>
                <td >{key === '#timestamp' ? 'date M/D-HH:mm:ss' : key}</td>
                {perfObject[key].map(value => <td key={Math.random()} style={{whiteSpace:'nowrap'}}>
                    {key === '#timestamp' ? convertTime(value) : value}
                    </td>)}
            </tr>)}
            </tbody>
        </table>
    </div>
  
}

export default Perf;