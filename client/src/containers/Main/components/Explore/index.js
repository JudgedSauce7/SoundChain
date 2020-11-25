import React, { Component } from 'react'
import {Card, Row, Col, Button, InputNumber} from 'antd'
import { HeartFilled, HeartOutlined, SendOutlined} from '@ant-design/icons'
import Identicon from 'identicon.js';
import Ethlogo from "../../../../assets/images/ethlogo.png"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "../../style.css"

export default class index extends Component {
    state = {
        liked: false,
        likedTitle: "",
        tip: 0
    }

    likeHandler = (title) => {
        console.log(title)
        this.setState({liked: !this.state.liked, likedTitle: title})
    }

    render() {
        const {account,uploads} = this.props
        const {liked, tip} = this.state
        const postStyle = {
            width: "600px",
            height: "300px",
            borderRadius: "20px",
            margin: "30px",
        }

        const options = {
            background: [255, 255, 255, 255],
        }

        const likeStyle = {
            color: "#d7385e",
            fontSize: 30,
            marginTop: 30,
        }

        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16} style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                        <Card style={{width: "80%", height: "100%", display: "flex", justifyContent: "center", overflowY: "scroll", marginBottom: 20}}>
                        {uploads.map((upload, key) => {
                        return (
                            <Card key={key} style={postStyle} hoverable>
                                <Row>
                                    <Col span={24}>
                                     <div className="postHeader">
                                    <img width="30px" height="30px" src={`data:image/png;base64,${new Identicon(account[0], options).toString()}`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 1px", marginLeft: "20px",
                                    borderRadius: "5px"}}/>
                                    <p style={{margin: 0, marginLeft: 15}}>{account}</p>
                                    </div>   

                                    <Row>
                                        <Col span={6}>
                                            <div className="widgets">
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                {liked && upload.title === this.state.likedTitle ? <HeartFilled style={likeStyle} onClick={() => this.likeHandler(upload.title)}/> : <HeartOutlined style={likeStyle} onClick={() => this.likeHandler(upload.title)}/>}
                                                <p className="likes">{upload.likes}</p>
                                                
                                            </div>

                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src={Ethlogo} width="30" height="40" style={{marginTop: 10}}/>
                                            </div>

                                            <div>
                                                <p style={{textAlign: "center", marginTop: 20, fontWeight: 700, fontSize: 16, marginBottom: 5}}>Send Tips</p>
                                                <div style={{display: "flex"}}>
                                                <InputNumber defaultValue={tip} style={{borderRadius: 10}}/>
                                                <Button style={{width: 50, height: 40, borderRadius: 10}} onClick={() => console.log(upload.title)} icon={<SendOutlined style={{fontSize: 30, color: "#A194C3"}}/>}/>
                                                </div>
                                            </div>
                                            </div>
                                        </Col>
                                        <Col span={18}>
                                            <p className="postTitle">{upload.title}</p>
                                            <AudioPlayer
                                            style={{marginLeft: 10, marginTop: 90}}
                                            src={`https://ipfs.infura.io/ipfs/${upload.hash_value}`}
                               
                                            />
                                        </Col>
                                    </Row>
                                    </Col>
                                    
                                </Row>
                            
                            </Card>
                        );
                        })}
                         </Card>   
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }
}
