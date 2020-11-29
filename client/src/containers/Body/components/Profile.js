import React, { Component } from "react";
import { Row, Col, Tabs } from "antd";
import {
  LineChartOutlined,
  DollarCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Identicon from "identicon.js";
import "../style.css";
import { Doughnut } from 'react-chartjs-2'

const { TabPane } = Tabs;

export default class Profile extends Component {


  render() {
    const options = {
      background: [255, 255, 255, 255],
    };
    const { user, account, balance } = this.props;
    const data1 = {
      labels: [
        'Total Amount Tipped',
        'Total Tips Collected'
      ],
      datasets: [{
      label: "Status of Tips",  
      data: [window.web3.fromWei(user.amountTipped.toString(),"Ether"), window.web3.fromWei(user.tipsReceived.toString(),"Ether")],
      
      
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    }]
    }

    const data2 = {
      labels: [
        'Total Earnings from Purchases',
        'Total Spent on Purchases'
      ],
      datasets: [{
      label: "Status of Earnings",  
      data: [window.web3.fromWei(user.amountEarned.toString(),"Ether"), window.web3.fromWei(user.amountSpent.toString(),"Ether")],
      
      
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        
      ],
      borderWidth: 1,
    }]
    }

    return (
      <div>
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div className="profileHeader">
              <img
                width="120px"
                height="120px"
                src={`data:image/png;base64,${new Identicon(
                  account,
                  options
                ).toString()}`}
                style={{
                  marginTop: 70,
                  borderRadius: "20px",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 1px",
                }}
              />

              <div style={{ marginTop: 60 }}>
                <p className="accountDetails">{account}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "40px",
                  }}
                >
                  <WalletOutlined
                    style={{ color: "#a040a1", fontSize: "40px" }}
                  />
                  <p
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      marginBottom: 0,
                      fontWeight: 700,
                    }}
                  >
                    {balance} ETH
                  </p>
                </div>
              </div>
            </div>
            <Row>
              <Col span={24}>
                <Tabs
                  defaultActiveKey="stats"
                  size="large"
                  type="card"
                  style={{ marginTop: "40px" }}
                >
                  <TabPane
                    tab={
                      <span style={{ color: "#a040a1" }}>
                        <LineChartOutlined />
                        My Stats
                      </span>
                    }
                    key="stats"
                  >
                    {/* <p
                      style={{
                        marginLeft: 10,
                        fontSize: 22,
                        marginBottom: 0,
                        fontWeight: 700,
                      }}
                    >
                      Amount Tipped:{" "}
                      {window.web3.fromWei(
                        user.amountTipped.toString(),
                        "Ether"
                      )}{" "}
                      ETH <br />
                      Tips Received:{" "}
                      {window.web3.fromWei(
                        user.tipsReceived.toString(),
                        "Ether"
                      )}{" "}
                      ETH
                      <br /> Amount Earned:{" "}
                      {window.web3.fromWei(
                        user.amountEarned.toString(),
                        "Ether"
                      )}{" "}
                      ETH
                      <br /> Amount Spent:{" "}
                      {window.web3.fromWei(
                        user.amountSpent.toString(),
                        "Ether"
                      )}{" "}
                      ETH
                      <br />
                      Songs Listened: {user.songsListened};
                    </p> */}
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{width: 500, height: 500}}>
                    <Doughnut data={data1}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}/>
        </div>

        <div style={{width: 500, height: 500}}>
                    <Doughnut data={data2}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}/>
        </div>
        </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span style={{ color: "#a040a1" }}>
                        <DollarCircleOutlined />
                        My Investments
                      </span>
                    }
                    key="investment"
                  >
                    <p className="investment">You haven't made any investments yet!</p>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
    );
  }
}
