import React, { Component } from 'react'
import {Row, Col, Divider} from 'antd'
import "../../style.css"

export default class index extends Component {
    render() {
        const {uploadCount} = this.props
        return (
         <Row>
           <Col span={16}>
            
        </Col>

        
        <Col span={8} style={{display: "flex"}}>
        <Divider type="vertical" style={{height: "100%"}}/>
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
