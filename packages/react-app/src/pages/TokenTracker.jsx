import React from 'react';
import './styles.css'
import logo from '../images/illus.png'
import eth from '../images/eth.svg'

function TokenTracker() {
    return ( 
        <div className='bgbody'>
            <div className='leftcont'>
                <div>
                    <img className='logo' src='https://i.ibb.co/6wNFYKv/icon.png'/>
                    <label className='logotitle'><span className='purple'>ReKarma</span></label>
                    <div className='tokencont'>
                        <label className='subtitle'>Account Details</label>
                        <label className='smalltext'> 0x0cb4r...5r9 </label>
                        <label className='smalltext'> Balance : {} ETH </label>
                    </div>
                    <div className='tokencont'>
                        <label className='subtitle' >Select Chain</label>
                        <button className='listbutton'><span className='listbutton-content'><img src={eth} className='crypto' /> Ethereum</span></button>
                        <button className='listbutton'><span className='listbutton-content'><img src='https://cryptologos.cc/logos/solana-sol-logo.svg?v=022' className='crypto' /> Solana</span></button>
                        <button className='listbutton'><span className='listbutton-content'><img src='https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022' className='crypto' /> Polygon</span></button>
                        <button className='listbutton'><span className='listbutton-content'><img src='https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022' className='crypto'/> Binance</span></button>
                    </div>
                </div>
            </div>
            <div className='rightcont'>
            <label className='logotitle'><span className='purple'>ReKarma Token Tracker</span> </label>
            <label className='subtitle' > Select Chain. Enter Token Address and find out all details of the tokens held in your wallet </label>
                <br/>
                <div className='rightbox' >
                    <label className='subtitle' >Enter Token Address</label>
                    <input className='searchbox' type='text'/>
                    <button className='listbutton'><span className='listbutton-content'>Search</span></button>
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