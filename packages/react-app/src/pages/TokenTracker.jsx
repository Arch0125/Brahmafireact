import React from "react";
import "./styles.css";
import logo from "../images/illus.png";
import eth from "../images/eth.svg";
import { useState, useEffect } from "react";
import { ETHERSCAN_KEY } from "../constants";
import { getAddressInfo, getAddressInfoFromCovalent, getAddressInfoFromEtherscan } from "../helpers/apis";

const COV_KEY = "ckey_eaca57491e9e4b3dab0ed5ab8dc";

const axios = require("axios").default;

const TokenTracker = () => {
  const [chainid, setChainid] = useState("");
  const [searchaddr, setSearchaddr] = useState("");

  const showaddr = async () => {
    console.log("Coming here");
    await getAddressInfo(searchaddr);
  };

  return (
    <div className="bgbody">
      <div className="leftcont">
        <div>
          <a href="/">
            <img className="logo" src="https://i.ibb.co/6wNFYKv/icon.png" />
            <label className="logotitle">
              <span className="purple">ReKarma</span>
            </label>
          </a>
          <div className="tokencont">
            <label className="subtitle">Account Details</label>
            <label className="smalltext"> 0x0cb4r...5r9 </label>
            <label className="smalltext"> Balance : {} ETH </label>
          </div>
          <div className="tokencont">
            <label className="subtitle">Select Chain</label>
            <button onClick={e => setChainid("1")} className="listbutton">
              <span className="listbutton-content">
                <img src={eth} className="crypto" /> Ethereum
              </span>
            </button>
            <button className="listbutton">
              <span className="listbutton-content">
                <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=022" className="crypto" /> Solana
              </span>
            </button>
            <button onClick={e => setChainid("137")} className="listbutton">
              <span className="listbutton-content">
                <img src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022" className="crypto" /> Polygon
              </span>
            </button>
            <button onClick={e => setChainid("56")} className="listbutton">
              <span className="listbutton-content">
                <img src="https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022" className="crypto" /> Binance
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="rightcont">
        <label className="logotitle">
          <span className="purple">ReKarma Token Tracker</span>{" "}
        </label>
        <label className="subtitle">
          {" "}
          Select Chain. Enter Token Address and find out all details of the tokens held in your wallet{" "}
        </label>
        <br />
        <div className="rightbox">
          <label className="subtitle">Enter Token Address</label>
          <input className="searchbox" type="text" onChange={e => setSearchaddr(e.target.value)} />
          <label>{searchaddr}</label>
          <button className="listbutton">
            <span className="listbutton-content" onClick={showaddr}>
              Search
            </span>
          </button>
        </div>
        <table className="tokenslist">
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
};

export default TokenTracker;
