import React from "react";
import { Typography } from "antd";
import './components.css'
const { Title, Text } = Typography;

// displays a page header

export default function Header({ link, title, subTitle, ...props }) {
  return (
    <div className="nav">
      <img width="40px" height="40px" src="https://i.ibb.co/6wNFYKv/icon.png"/>
      <input type="text " className="textbox" placeholder="Search by account, token, ENS  " />
      <div className="accdet"> 
      {props.children}

      </div>

    </div>
  );
}
