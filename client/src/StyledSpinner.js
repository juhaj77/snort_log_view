import React from 'react'
import spinner from './Spinner.svg'

const StyledSpinner = () =>  <div style={{width:'100vw',height:'100vh',background:'black'}}>
                                <div style={{
                                position: 'absolute',
                                top: 'calc(50% - 100px)',
                                left: 'calc(50% - 100px)'
                                }}>
                                    <img src={spinner} alt="Loading..." />
                                </div>
                            </div>

export default StyledSpinner
