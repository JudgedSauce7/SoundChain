import React, { Component } from "react";
import mainLogo from "../../assets/images/logo.png";
import {Input, Select} from "antd"
import {
  UserOutlined,
  CompassOutlined,
  HomeOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import "./style.css";
const { Search } = Input;
const { Option } = Select;

export default class index extends Component {

  render() {
    const { currentActiveLink, searchHandler, sortBy} = this.props;
    return (
      <div className="mainHeader">
        <div className="flexboxContainer">
          <div
            className="flexboxContainer"
            style={{ marginTop: "35px", marginLeft: "30px" }}
            onClick={() => this.props.changeLinkHandler("home")}
          >
            <p className="title" style={{ fontWeight: "800" }}>
              Sound
            </p>
            <p className="title">Chain</p>
          </div>
          <div style={{ marginLeft: "-10px" }}>
            <img src={mainLogo} width="60px" height="60px" />
          </div>
        </div>

        {currentActiveLink === "explore" ? <div className="flexboxContainer">
        <Search placeholder="Search track by name" onChange={(e) => searchHandler(e.target.value)} style={{ width: 200 }} onPressEnter={(e) => searchHandler(e.target.value)} onSearch={(e) => searchHandler(e.target.value)}/>
        <Select style={{width: 200, marginLeft: 10}} value={sortBy} onChange={(value) => this.props.sortHandler(value)}>
         <Option value="latest">Sort By latest track</Option> 
        <Option value="likes">Sort By most liked</Option>
        <Option value="tips">Sort By most tipped</Option>
      </Select>
        </div> : null}
        

        <div
          className="flexboxContainer"
          style={{ marginTop: "5px", marginRight: "30px" }}
        >
          <div
            className="links"
            style={{
              marginLeft: "30px",
              border: currentActiveLink === "home" ? "3px solid #fff" : null,
            }}
            onClick={() => this.props.changeLinkHandler("home")}
          >
            <HomeOutlined />
          </div>
          <div
            className="links"
            style={{
              marginLeft: "30px",
              border: currentActiveLink === "explore" ? "3px solid #fff" : null,
            }}
            onClick={() => this.props.changeLinkHandler("explore")}
          >
            <CompassOutlined />
          </div>
          <div
            className="links"
            style={{
              marginLeft: "30px",
              border: currentActiveLink === "media" ? "3px solid #fff" : null,
            }}
            onClick={() => this.props.changeLinkHandler("media")}
          >
            <CustomerServiceOutlined />
          </div>
          <div
            className="links"
            style={{
              marginLeft: "30px",
              border: currentActiveLink === "profile" ? "3px solid #fff" : null,
            }}
            onClick={() => this.props.changeLinkHandler("profile")}
          >
            <UserOutlined />
          </div>
        </div>
      </div>
    );
  }
}
