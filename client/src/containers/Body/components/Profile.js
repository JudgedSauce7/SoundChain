import React, { Component } from "react";
import { Row, Col, Tabs } from "antd";
import {
  LineChartOutlined,
  DollarCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Identicon from "identicon.js";
import "../style.css";
import { useTheme } from "@material-ui/core";

const { TabPane } = Tabs;

export default class Profile extends Component {
  render() {
    const options = {
      background: [255, 255, 255, 255],
    };
    const { user, account, balance } = this.props;
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
                    <p
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
                      <br /> Amount Tipped:{" "}
                      {window.web3.fromWei(
                        user.amountSpent.toString(),
                        "Ether"
                      )}{" "}
                      ETH
                      <br />
                    </p>
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
                    My Investments
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
