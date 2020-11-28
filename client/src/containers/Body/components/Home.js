import React, { Component } from "react";
import { Row, Col, Card, Divider, Avatar, Button } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { HeartFilled } from "@ant-design/icons";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import whiteLogo from "../../../assets/images/whitelogo.png";
import "../style.css";

export default class Home extends Component {
  render() {
    const { bought, uploads } = this.props;
    return (
      <Row>
        <Col span={18}>
          {bought.length === 0 ? (
            <h1 className="mainHeading">
              You haven't bought any songs yet. Head on to the explore tab to see
              what's trending!
            </h1>
          ) : (
            <h1 className="mainHeading">
              You have bought {bought.length} songs yet. Head on to the explore
              tab for more...
            </h1>
          )}

          <Row>
            {uploads.map((upload, i) => {
              if(bought.includes(upload.id)) {
              return (
                <Col span={8} key={i} style={{ marginTop: 30}}>
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
                            {window.web3.fromWei(upload.tipsCollected.toString(), "Ether")}
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
            }
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
            <MusicNoteIcon
              style={{
                margin: 0,
                marginLeft: "-10px",
                color: "#A153A9",
                fontSize: "100px",
              }}
            />
          </p>
          </div>
          <br />
        </Col>
      </Row>
    );
  }
}
