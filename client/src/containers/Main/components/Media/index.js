import React, { Component } from 'react'
import {Row, Col, Divider, Card} from 'antd'
import {HeartFilled} from '@ant-design/icons'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import whiteLogo from "../../../../assets/images/whitelogo.png"
import "../../style.css"

export default class index extends Component {
    render() {
        const {uploadCount, uploads} = this.props
        return (
         <Row>
           <Col span={18}>
             <Row >
             {uploads.map((upload,i) => {
               console.log(i)
               return (
                 <Col span={8} key={i} style={{marginTop: 30}}>
                    <Card className="cardStyle" style={{marginLeft: i===0 ? 20 : 10, borderRadius: 20, background: "#A7B0D2"}} hoverable>
                      <div className="container">
                      <p className="music">{upload.title}</p>
                        <div style={{display: "flex", alignItems: "center"}}>
                          <div style={{display: "flex", alignItems: "center"}}>
                          <HeartFilled style={{fontSize: 30, color: "#fff"}}/>
                          <p className="music" style={{margin: 0, marginLeft: 10}}>{upload.likes}</p>
                          </div>

                          <div style={{display: "flex", alignItems: "center"}}>
                          <img src={whiteLogo} height="30px" width="30px" style={{marginLeft: 140}}/>
                          </div>
                        
                        </div>
               
               <AudioPlayer src={`https://ipfs.infura.io/ipfs/${upload.hash_value}`} style={{width: 270, height: 80, borderRadius: 10, marginLeft: -10, marginTop: 10}}/>
               
               </div>
                    </Card>
                 </Col>
               )
             })}
            </Row>
        </Col>

        
        <Col span={6} style={{display: "flex"}}>
        <Divider type="vertical" style={{height: "100%", background: "#ccc"}}/>
        <div className="upload">
        <h1>You have {uploadCount} uploads yet</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const title = this.fileTitle.value;
            await this.props.uploadMedia(title);
          }}
        >
          <input
            type="file"
            accept=".mp3, .mov, .wav"
            onChange={(e) => this.props.captureFile(e)}
            className="choose"
          />
          <br />
          <input
            id="title"
            type="text"
            placeholder="What's your song called?..."
            className="input"
            required
            ref={(input) => {
              this.fileTitle = input;
            }}
          />
          <br />
          <button type="submit" className="button">Upload file</button>
        </form>

        
        </div>
        </Col>
        </Row>
        )
    }
}
