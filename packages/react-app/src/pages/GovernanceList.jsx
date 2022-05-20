import React from 'react';
import govdata from './governance.json'

function GovernanceList(){
    const DisplayData = govdata.map((info)=>
    {
        return(
            <button className='listbutton'><span className='listbutton-content'><img src={info.logo} className='crypto' />{info.name}</span></button>
        )
    })
}

export default GovernanceList;