import React from 'react';
import './styles.css'
import logo from '../images/illus.png'
import eth from '../images/eth.svg'
import { useState, useEffect } from 'react';
import { ETHERSCAN_KEY } from '../constants';

const COV_KEY = 'ckey_eaca57491e9e4b3dab0ed5ab8dc'

const axios = require('axios').default;

const TokenTracker = () => {

    const[chainid,setChainid]=useState('');
    const[searchaddr,setSearchaddr]=useState('');
const key = "FB9T6ZRC7NHVQ9TUU51MM9BVX8Q2FXVMV4"
const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${searchaddr}&page=1&offset=1000&startblock=0&endblock=999999999&sort=asc&apikey=${ETHERSCAN_KEY}`
//const url = `https://api.covalenthq.com/v1/1/address/0x4E83362442B8d1beC281594cEa3050c8EB01311C/portfolio_v2/?&key=ckey_eaca57491e9e4b3dab0ed5ab8dc`

const getTokenInfo = async () =>{
    axios.get(url)
      .then(function (response) {
        const res = response.data.result;

        //console.log(response.data.data.items); For Covalent Usecase
        const data =[]
        const userAddressMap = new Map(); 
        const userHoldingMap = new Map();
        for (let index in res) {

            const dataObj = {
                to: res[index].to,
                from: res[index].from,
                tokenAddress: res[index].contractAddress,
                tokenSymbol:res[index].tokenSymbol,
                tokenName:res[index].tokenSymbol,
            }  
            
            if(!userAddressMap.get(res[index].contractAddress)){
                userAddressMap.set(res[index].contractAddress,true);
                userHoldingMap.set(res[index].contractAddress, res[index].timeStamp);
            }
            
            if(Number(userHoldingMap.get(res[index].contractAddress)) >= Number(res[index].timeStamp)){
                userHoldingMap.set(res[index].contractAddress, res[index].timeStamp);
            }
           
            
            data.push(dataObj)
          }
          console.log(userAddressMap)
          console.log(userHoldingMap)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      }); 
}


    const showaddr = async () =>{
        console.log(searchaddr);
        await getTokenInfo();
    }

    return ( 
        <div className='bgbody'>
            <div className='leftcont'>
                <div>
                    <a href='/'>
                    <img className='logo' src='https://i.ibb.co/6wNFYKv/icon.png'/>
                    <label className='logotitle'><span className='purple'>ReKarma</span></label>
                    </a>
                    <div className='tokencont'>
                        <label className='subtitle'>Account Details</label>
                        <label className='smalltext'> 0x0cb4r...5r9 </label>
                        <label className='smalltext'> Balance : {} ETH </label>
                    </div>
                    <div className='tokencont'>
                        <label className='subtitle' >Select Chain</label>
                        <button onClick={e => setChainid('1')} className='listbutton'><span className='listbutton-content'><img src={eth} className='crypto' /> Ethereum</span></button>
                        <button className='listbutton'><span className='listbutton-content'><img src='https://cryptologos.cc/logos/solana-sol-logo.svg?v=022' className='crypto' /> Solana</span></button>
                        <button onClick={e => setChainid('137')} className='listbutton'><span className='listbutton-content'><img src='https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022' className='crypto' /> Polygon</span></button>
                        <button onClick={e => setChainid('56')}className='listbutton'><span className='listbutton-content'><img src='https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022' className='crypto'/> Binance</span></button>
                    </div>
                </div>
            </div>
            <div className='rightcont'>
            <label className='logotitle'><span className='purple'>ReKarma Token Tracker</span> </label>
            <label className='subtitle' > Select Chain. Enter Token Address and find out all details of the tokens held in your wallet </label>
                <br/>
                <div className='rightbox' >
                    <label className='subtitle' >Enter Token Address</label>
                    <input className='searchbox' type='text' onChange={e => setSearchaddr(e.target.value)}/>
                    <label>{searchaddr}</label>
                    <button className='listbutton'><span className='listbutton-content' onClick={showaddr}>Search</span></button>
                </div>
                <table className='tokenslist'>
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

export default TokenTracker;