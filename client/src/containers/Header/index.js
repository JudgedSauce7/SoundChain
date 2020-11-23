import React, { Component } from 'react';
import Title from "./Title";
import { Button } from "antd";

export default class index extends Component {
    state = {
        current: "about"
    }

    render() {
        const {current} = this.state
        return (
            <div className="mainHeader">
                <div>
                <Title />
                </div>
                

                <div style={{display: "flex", marginTop: "-15px"}}>
                <div>
                <p className="links">About Us</p>
                {current === "about" ? <div className="activeLink"/> : null}
                
                </div>

                <div>
                <p className="links" style={{marginLeft: "100px"}}>Discover</p>
                {current === "discover" ? <div className="activeLink" style={{marginLeft: "100px"}}/> : null}
                </div>
                </div>

                <div style={{marginLeft: "120px", display: "flex", alignItems: "center", marginTop: "-10px"}}>
                    <Button shape="round" style={{width: "150px", height: "40px", background: "#59BE8D", color: "#ffffff", fontWeight: "800", border: current === "signin" ? "4px solid #2A9756" : null}}>SIGN IN</Button>
                    <Button shape="round" style={{width: "150px", height: "40px", marginLeft: "50px", color: "#59BE8D", fontWeight: "800", border: current === "signup" ? "4px solid #2A9756" : null}}>SIGN UP</Button>
                </div>
            </div>
        )
    }
}
