import React, { Component } from 'react'
import {Row, Col, Card, Avatar, Button} from "antd"
import {FireOutlined} from "@ant-design/icons"
import Profile from "./components/Profile/index"
import Media from "./components/Media/index"
import Explore from "./components/Explore/index"
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import "./style.css"

export default class index extends Component {
    
    render() {
        const {currentActiveLink, account, balance, uploadCount, uploadMedia, captureFile, uploads} = this.props
        return (
            <div className="mainWindow">
                {currentActiveLink === "home" ? 
                <Row> 
                    <Col span={16}> 
                    <Row style={{display: "flex", alignItems: "center", marginTop: 40}}>
                        {/* <Col span={8}>
                        <div style={{marginLeft: 20, boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 20}}>
                            <EmojiSymbolsIcon style={{width: 200, height: 200, color: "rgba(108, 31, 109, 0.89)", zIndex: 1}}/>  
                        </div>
                        </Col>
                        <Col span={16}>
                            <div className="text">
                                <p>Share your music and earn 100% of your tips and sales</p>
                            </div> */}
                        {/* </Col> */}
                     </Row> 

                <Row>
                    <Col span={24}>
                    {/* <Card className="card"></Card> */}
                    </Col>
                </Row>    

                <Row>
                    <Col span={24}>
                        
                    </Col>
                </Row>         
                    
                    
                    
                
                </Col>
                <Col span={8} style={{marginTop: "100px"}}>
                <span style={{display: "flex", alignItems: "center"}}>
                    <p className="mainText" style={{marginBottom: "0"}}>Liberating Music</p> <FireOutlined style={{margin: 0, marginTop: "90px", marginLeft: "-10px", color: "rgba(241, 118, 4, 0.79)", fontSize: "50px"}}/></span><br />
                    <p className="mainText" style={{fontSize: "25px", fontWeight: "normal", marginTop: "0", marginRight: "100px"}}>Connecting artists and fans directly using Ethereum.</p>
                </Col>
                </Row>
                : null}
                {currentActiveLink === "explore" ? <Explore account={account} uploads={uploads}/> : null}
                {currentActiveLink === "media" ? <Media uploadCount={uploadCount} uploadMedia={uploadMedia} captureFile={captureFile} uploads={uploads}/> : null}
                {currentActiveLink === "profile" ? <Profile account={account} balance={balance}/> : null}
                
            </div>
        )
    }
}
