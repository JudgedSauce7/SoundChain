import React, { Component } from "react";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Media from "./components/Media";
import Profile from "./components/Profile";
import "./style.css";

export default class index extends Component {
  render() {
    return (
      <div className="mainWindow">
        {this.props.currentActiveLink === "home" ? (
          <Home bought={this.props.bought} uploads={this.props.uploads} />
        ) : null}
        {this.props.currentActiveLink === "explore" ? (
          <Explore
            account={this.props.account}
            uploads={this.props.uploads}
            likeMedia={this.props.likeMedia}
            tipMedia={this.props.tipMedia}
            buyMedia={this.props.buyMedia}
            liked={this.props.liked}
            searchInput={this.props.searchInput}
            bought={this.props.bought}
            listenSong={this.props.listenSong}
          />
        ) : null}
        {this.props.currentActiveLink === "media" ? (
          <Media
            account={this.props.account}
            uploads={this.props.uploads}
            uploadMedia={this.props.uploadMedia}
            captureFile={this.props.captureFile}
          />
        ) : null}
        {this.props.currentActiveLink === "profile" ? (
          <Profile
            account={this.props.account}
            balance={this.props.balance}
            user={this.props.user}
          />
        ) : null}
      </div>
    );
  }
}
