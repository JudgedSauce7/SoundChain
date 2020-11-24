import React, { Component } from 'react'
import {Row, Col, Card} from "antd"
import {FireOutlined} from "@ant-design/icons"
import Profile from "./components/Profile/index"
import Media from "./components/Media/index"
import Explore from "./components/Explore/index"
import "./style.css"


export default class index extends Component {
    
    render() {
        const {currentActiveLink, account, balance} = this.props
        return (
            <div className="mainWindow">
                {currentActiveLink === "home" ? 
                <Row> 
                    <Col span={16}>               
                    <div style={{marginTop: "70px", marginLeft: "-70px"}}>
                    
                </div>
                </Col>
                <Col span={8} style={{marginTop: "100px"}}>
                <span style={{display: "flex", alignItems: "center"}}>
                    <p className="mainText" style={{marginBottom: "0"}}>Liberating Music</p> <FireOutlined style={{margin: 0, marginTop: "90px", marginLeft: "-10px", color: "rgba(241, 118, 4, 0.79)", fontSize: "50px"}}/></span><br />
                    <p className="mainText" style={{fontSize: "25px", fontWeight: "normal", marginTop: "0", marginRight: "100px"}}>Connecting artists and fans directly using Ethereum.</p>
                </Col>
                </Row>
 : null}
                {currentActiveLink === "explore" ? <Explore /> : null}
                {currentActiveLink === "media" ? <Media /> : null}
                {currentActiveLink === "profile" ? <Profile account={account} balance={balance}/> : null}
                
            </div>
        )
    }
}
