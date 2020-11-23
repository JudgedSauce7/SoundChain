import React, { Component } from 'react'
import {Carousel} from "antd"


export default class index extends Component {
    
    render() {
        const contentstyle= {
            fontSize: "48px",
            color: "rgba(241, 118, 4, 0.79)",
            textAlign: "center",
            fontWeight: "700"
        }
        return (
            <div>
                {/* <Carousel autoplay style={{marginTop: "650px"}} easing>
                    <div>
                        <h3 style={contentstyle}>Welcome to SoundChain...</h3>
                    </div>
                    <div>
                        <h3 style={contentstyle}>where we connect the dots</h3>
                    </div>
                    <div>
                        <h3 style={contentstyle}>between music creators and fans</h3>
                    </div>
                    <div>
                        <h3 style={contentstyle}>using Ethereum!</h3>
                    </div>
                </Carousel> */}
            </div>
        )
    }
}
