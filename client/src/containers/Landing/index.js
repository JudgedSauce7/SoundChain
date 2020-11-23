import React, { Component } from 'react'
import Header from "../Header/index"
import MainWindow from "../Main/index"
import "./style.css"

export default class index extends Component {
    
    render() {
        return (
            <div className="mainLanding">
                <Header />
                <MainWindow />
                
            </div>
        )
    }
}
