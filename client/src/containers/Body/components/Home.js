import React, { Component } from "react";
import { Row, Col, Card, Divider, Avatar, Button } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { HeartFilled } from "@ant-design/icons";
import EmojiSymbolsIcon from "@material-ui/icons/EmojiSymbols";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import whiteLogo from "../../../assets/images/whitelogo.png";
import "../style.css";

export default class Home extends Component {
  render() {
    const { bought } = this.props;
    return (
      <Row>
        <Col span={18}>
          {bought.length === 0 ? (
            <h1 className="mainHeading">
              You haven't bought anything yet. Head on to the explore tab to see
              what's trending!
            </h1>
          ) : (
            <h1 className="mainHeading">
              You have bought {bought.length} songs yet. Head on to the explore
              tab for more...
            </h1>
          )}

          <Row>
            {bought.map((upload, i) => {
              console.log(i);
              return (
                <Col span={8} key={i} style={{ marginTop: 30 }}>
                  <Card
                    className="cardStyle"
                    style={{
                      marginLeft: i === 0 ? 20 : 10,
                      borderRadius: 20,
                      background: "#A7B0D2",
                    }}
                    hoverable
                  >
                    <div className="container">
                      <p className="music">{upload.title}</p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <HeartFilled
                            style={{ fontSize: 30, color: "#fff" }}
                          />
                          <p
                            className="music"
                            style={{ margin: 0, marginLeft: 10 }}
                          >
                            {upload.likes}
                          </p>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={whiteLogo}
                            height="30px"
                            width="30px"
                            style={{ marginLeft: 140 }}
                          />
                          <p
                            className="music"
                            style={{ margin: 0, marginLeft: 10 }}
                          >
                            {upload.tipsCollected}
                          </p>
                        </div>
                      </div>

                      <AudioPlayer
                        src={`https://ipfs.infura.io/ipfs/${upload.hash_value}`}
                        style={{
                          width: 270,
                          height: 80,
                          borderRadius: 10,
                          marginLeft: -10,
                          marginTop: 10,
                        }}
                      />
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col span={6} style={{ display: "flex", height: "100vh" }}>
          <Divider
            type="vertical"
            style={{ height: "100%", background: "#ccc" }}
          />
          <div style={{marginTop: 100}}>
          <p style={{ alignItems: "center" }}>
            <p className="mainText" style={{ marginBottom: "0"}}>
              Liberating Music
            </p>
            <FireOutlined
              style={{
                margin: 0,
                marginLeft: "-10px",
                color: "rgba(241, 118, 4, 0.79)",
                fontSize: "100px",
              }}
            />
          </p>
          </div>
          <br />
          {/* <div
            className="mainText"
            style={{
              fontSize: "25px",
              fontWeight: "normal",
              marginTop: "0",
              marginRight: "100px",
            }}
          >
            Connecting artists and fans directly using Ethereum.
          </div>
          <div
            style={{
              marginLeft: 20,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 20,
            }}
          >
            <EmojiSymbolsIcon
              style={{
                width: 200,
                height: 200,
                color: "rgba(108, 31, 109, 0.89)",
                zIndex: 1,
              }}
            />
          </div>
          <div className="text">
            <p>Share your music and earn 100% of your tips and sales</p>
          </div> */}
        </Col>
      </Row>
    );
  }
}
