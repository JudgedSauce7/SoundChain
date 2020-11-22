import React, { Component } from 'react'
import Circles from "./circles"
import Mainwindow from "./mainwindow"
import "./style.css"

export default class index extends Component {
    componentDidMount() {
        console.log("background")
    }
    render() {
        return (
            <div className="backdrop">
            <Circles />    
            <Mainwindow />    
            </div>
        )
    }
}
