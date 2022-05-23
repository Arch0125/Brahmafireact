import React from 'react';
import './styles.css'
import logo from '../images/illus.png'
import eth from '../images/eth.svg'
import { useState, useEffect } from 'react';
import govdata from './Governance.json'
import { getCastVoteDetails } from '../helpers/apis';

function Governance() {

        const[address,setAddress]=useState('');
        const[govaddress,setGovaddress]=useState('');
    
        const DisplayData = govdata.map((info)=>
        {
            var addr = (info.address);
            return(
                <button onClick={() => setGovaddress(addr)} className='listbutton'><span className='listbutton-content'><img src={info.logo} className='crypto' />  {info.name}</span></button>
            )
        })
        
        const getVotingDetails =() =>{
            getCastVoteDetails(address,govaddress);
            console.log(govaddress);
            console.log(address);
        }

    return ( 
        <div className='bgbody'>
            <div id='govleft' className='leftcont'>
                <div>
                    <a href='/'>
                    <img className='logo' src='https://i.ibb.co/6wNFYKv/icon.png'/>
                    <label className='logotitle'><span className='purple'>ReKarma</span></label>
                    </a>
                    <div id='govlist' className='tokencont'>
                        
                        <label className='subtitle'>Account Details</label>
                        <label className='smalltext'> 0x0cb4r...5r9 </label>
                        <label className='smalltext'> Balance : {} ETH </label>
                    </div>
                    <div id='govlist' className='tokencont'>
                        <label className='subtitle' >Top 20 Protocols on Defillama</label>
                        <br/>
                        {DisplayData}
                    </div>
                </div>
            </div>
            <div id='govright' className='rightcont'>
            <label className='logotitle'><span className='purple'>Governance Tracker</span> </label>
                <br/>
                <div id='govsearch' className='rightbox' >
                    <label className='subtitle'  >Enter Account Address</label>
                    <input onChange={(e) => setAddress(e.target.value)} className='searchbox' type='text'/>
                    <button onClick={getVotingDetails} className='listbutton'><span className='listbutton-content'>Search</span></button>
                </div>
                <table id='govsearch' className='tokenslist'>
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Address</th>
                            <th>Time held</th>
                            <th>Current Balance</th>
                        </tr>
                    </thead>
                </table>
            </div>

        </div>
     );
}

export default Governance;