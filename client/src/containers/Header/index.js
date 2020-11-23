import React, { Component } from 'react';
import mainLogo from "../../assets/images/logo.png"
import "./style.css"

export default class index extends Component {
    render() {
        return (
            <div className="mainHeader">
                <div className="flexboxContainer">
                    <div className="flexboxContainer" style={{marginTop: "35px", marginLeft: "30px"}}>
                        <p className="title" style={{fontWeight: "800"}}>Sound</p>
                        <p className="title">Chain</p>
                    </div>
                    <div style={{marginLeft: "-10px"}}>
                        <img src={mainLogo} width="80px" height="80px" />
                    </div>
                </div>

                <div className="flexboxContainer" style={{marginTop: "5px", marginRight: "30px"}}>
                    <div className="links">Home</div>
                    <div className="links" style={{marginLeft: "30px"}}>Explore</div>
                    <div className="links" style={{marginLeft: "30px"}}>My Music</div>
                    <div className="links" style={{marginLeft: "30px"}}>My Profile</div>
                </div>
            </div>
        )
    }
}
