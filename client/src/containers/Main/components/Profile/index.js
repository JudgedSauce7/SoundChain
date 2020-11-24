import React, { Component } from 'react'
import {Row, Col, Tabs} from "antd"
import {LineChartOutlined, DollarCircleOutlined, WalletOutlined} from "@ant-design/icons"
import Identicon from 'identicon.js';
import "../../style.css"

const { TabPane } = Tabs;

export default class index extends Component {
    render() {
        const options = {
            background: [255, 255, 255, 255],
        }
        const {account, balance} = this.props 
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div className="profileHeader">
                            <img width="120px" height="120px" src={`data:image/png;base64,${new Identicon(account[0], options).toString()}`} style={{marginTop: 70, borderRadius: "20px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 1px"}}/>

      
            <div style={{marginTop: 60}}>
        <p className="accountDetails">{account}</p>
        <div style={{display: "flex", alignItems: "center", marginLeft: "40px"}}>
        <WalletOutlined style={{color: "rgba(108, 31, 109, 0.89)", fontSize: "40px"}}/>
        <p style={{marginLeft: 10, fontSize: 18, marginBottom: 0, fontWeight: 700}}>{balance} ETH</p>
        </div>
        </div>
        
        
                        </div>
                        <Row>
                            <Col span={24}>
                                <Tabs defaultActiveKey="stats" size="large" type="card" style={{marginTop: "40px"}}>
                                    <TabPane
                                    tab={
                                        <span style={{color: "rgba(241, 118, 4, 0.79)"}}>
                                            <LineChartOutlined />
                                            My Stats
                                        </span>
                                    }
                                    key="stats">My Stats</TabPane>
                                    <TabPane
                                    tab={
                                        <span style={{color: "rgba(241, 118, 4, 0.79"}}>
                                            <DollarCircleOutlined />
                                            My Investments
                                        </span>
                                    }
                                    key="investment">My Investments</TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }
}
