import React, { Component } from "react";
import { Card, Row, Col, Button, InputNumber } from "antd";
import { HeartFilled, HeartOutlined, SendOutlined } from "@ant-design/icons";
import Identicon from "identicon.js";
import Ethlogo from "../../../assets/images/ethlogo.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../style.css";

export default class Explore extends Component {
  state = {
    tip: 0,
  };

  likeHandler = async (id) => {
    await this.props.likeMedia(id);
  };

  changeHandler = value => {
    this.setState({tip: value})
  }

  tipPost = async (id,tip) => {
    await this.props.tipMedia(id,tip)
  }

  render() {
    const { account, uploads, liked, searchInput } = this.props;
    const { tip } = this.state;
    const postStyle = {
      width: "600px",
      height: "300px",
      borderRadius: "20px",
      margin: "30px",
    };

    const options = {
      background: [255, 255, 255, 255],
    };

    const likeStyle = {
      color: "#d7385e",
      fontSize: 30,
      marginTop: 30,
    };

    return (
      <div>
        <Row>
          <Col
            span={24}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Card
              style={{
                width: "90%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                overflowY: "scroll",
                marginBottom: 20,
              }}
              hoverable
            >
              <Row gutter={10}>
                {uploads.filter(upload => upload.artist !== account && upload.title.toLowerCase().includes(searchInput)).map((upload) => {
                return (
                      <Col span={12} key={upload.id}>
                        <Card style={postStyle} hoverable>
                        <div className="postHeader">
                          <img
                            width="30px"
                            height="30px"
                            src={`data:image/png;base64,${new Identicon(
                              upload.artist,
                              options
                            ).toString()}`}
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 1px",
                              marginLeft: "20px",
                              borderRadius: "5px",
                            }}
                          />
                          <p style={{ margin: 0, marginLeft: 15 }}>
                            {upload.artist}
                          </p>
                        </div>

                        <Row>
                          <Col span={6}>
                            <div className="widgets">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {upload.likes > 0 && liked.includes(upload.id) ? <HeartFilled style={likeStyle} /> : <HeartOutlined style={likeStyle} onClick={() => this.likeHandler(upload.id)}/>}
                    
                                <p className="likes">{upload.likes}</p>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={Ethlogo}
                                  width="30"
                                  height="40"
                                  style={{ marginTop: 10 }}
                                />
                                <p className="likes" style={{ marginTop: 10 }}>
                                  {window.web3.fromWei(upload.tipsCollected.toString(), "Ether")}
                                </p>
                              </div>

                              <div>
                                <Button
                                  style={{
                                    background: "#a7b0d2",
                                    color: "#fff",
                                    fontWeight: 700,
                                    marginTop: 10,
                                    borderRadius: 10,
                                  }}
                                >
                                  {`Buy for ${upload.price} ETH`}
                                </Button>
                              </div>

                              <div>
                                <p
                                  style={{
                                    textAlign: "center",
                                    marginTop: 10,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    marginBottom: 5,
                                  }}
                                >
                                  Send Tips
                                </p>
                                <div style={{ display: "flex" }}>
                                  <InputNumber
                                    defaultValue={tip}
                                    style={{ borderRadius: 10 }}
                                    onChange={this.changeHandler}
                                  />
                                  <Button
                                    style={{
                                      width: 40,
                                      height: 30,
                                      borderRadius: 10,
                                      background: "#a7b0d2",
                                      marginLeft: 10,
                                    }}
                                    onClick={() => this.tipPost(upload.id, tip)}
                                    icon={
                                      <SendOutlined
                                        style={{ fontSize: 20, color: "#fff" }}
                                      />
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col span={18}>
                            <p className="postTitle">{upload.title}</p>
                            <AudioPlayer
                              style={{ marginLeft: 10, marginTop: 90 }}
                              src={`https://ipfs.infura.io/ipfs/${upload.hash_value}`}
                            />
                          </Col>
                        </Row>
                        </Card>
                      </Col>
                    
                );
              })}
              
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
