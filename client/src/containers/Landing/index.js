import React, { Component } from 'react'
import Header from "../Header/index"
import MainWindow from "../Main/index"
import {Row, Col} from "antd"
import "./style.css"

export default class index extends Component {
    state = {
        currentActiveLink: "home"
    }

    changeLinkHandler = (currentActiveLink) => {
        this.setState({currentActiveLink})
    }

    render() {
        const {account, balance, uploadCount, uploadMedia, captureFile, uploads, loading, likeMedia} = this.props
        const {currentActiveLink} = this.state
        return (
            <div className="mainLanding">
                <Row style={{height: "65px"}}>
                    <Col span={24}>
                    <Header changeLinkHandler={this.changeLinkHandler} currentActiveLink={currentActiveLink}/>
                    </Col>
                </Row>
                
                <Row>
                    <Col span={24}>
                    <MainWindow account={account} loading={loading} currentActiveLink={currentActiveLink} balance={balance} uploads={uploads} uploadCount={uploadCount} uploadMedia={uploadMedia} captureFile={captureFile} likeMedia={likeMedia}/>
                    </Col>
                </Row>
                
                
            </div>
        )
    }
}
