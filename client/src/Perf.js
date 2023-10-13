import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import './App.css';

function Perf() {

  const [perf, setPerf] = useState([[]])
  const [perfObject, setPerfObject] = useState({})

  const callServer = async () => {
    await fetch("http://localhost:9000/perf")
        .then(async res => await res.text())
        .then(res => {
           setPerf(res.split('\n').map(l => l.split(',')))
           let hellishObject = {}
           for(let i = 0; i < perf[0].length; i++){
               hellishObject[perf[0][i]] = []
               for(let j = 1; j < perf.length - 1; j++){
                   if(!isNaN(perf[j][i])) hellishObject[perf[0][i]].push(perf[j][i])
               } 
           }
           for(const key of Object.keys(hellishObject)){
               if(hellishObject[key].length > 0 && hellishObject[key].reduce((sum,value) => sum + value,0) == 0)
                   delete hellishObject[key]
           }
           setPerfObject(hellishObject)
        })
        .catch(err => console.log(err));  
  }

  useEffect(() => {
   callServer()
  },[perf])

  const convertTime = (seconds) => {
    const date = new Date(seconds*1000)
    const time = date.toTimeString().split(' ')
    return (date.getMonth()+1)+'/'+date.getDate()+'-'+time[0]
  }

  return Object.keys(perfObject).length === 0 ? <Loading text='loading...'/> :
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