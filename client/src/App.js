import React, { Component } from "react";
import { Spin } from "antd";
import SoundChainContract from "./contracts/SoundChain.json";
import getWeb3 from "./getWeb3";
import Header from "./containers/Header/index";
import Body from "./containers/Body/index";
import { Row, Col } from "antd";
import "./App.css";

import ipfsClient from "ipfs-http-client";
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default class App extends Component {
  state = {
    web3: null,
    account: null,
    soundchain: null,
    buffer: null,
    uploadCount: null,
    userCount: null,
    uploads: [],
    users: [],
    bought: [],
    liked: [],
    loading: true,
    balance: 0,
    currentActiveLink: "home",
    searchInput: "",
    sortBy: "latest",
    user: null,
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const wallet = await web3.eth.getBalance(account);

      let balance = web3.utils.fromWei(wallet, "ether");
      balance = parseFloat(balance).toFixed(3);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SoundChainContract.networks[networkId];

      const soundchain = new web3.eth.Contract(
        SoundChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState(
        { web3, account, soundchain, balance },
        this.getUploadCount
      );
    } catch (error) {
      alert(`Failed to load. Please install MetaMask`);
      console.error(error);
    }
    await this.getUserDetails();
    await this.getLiked();
    await this.getBought();
  };

  getUploadCount = async (newUpload) => {
    const { soundchain } = this.state;
    const uploadCount = await soundchain.methods.uploadCount().call();
    if (newUpload) {
      this.setState({ uploadCount, loading: false }, this.updateUploads);
    } else {
      this.setState({ uploadCount, loading: false }, this.getUploads);
    }
  };

  getUserDetails = async () => {
    const { soundchain, account } = this.state;
    const user = await soundchain.methods.users(account).call();
    this.setState({ user });
  };

  getUserCount = async () => {
    const { soundchain } = this.state;
    const userCount = await soundchain.methods.userCount().call();
    this.setState({ userCount });
  };

  getUploads = async () => {
    let newUploads = [];
    for (let i = 1; i <= this.state.uploadCount; i++) {
      const upload = await this.state.soundchain.methods.uploads(i).call();
      newUploads = [upload, ...newUploads];
    }
    this.setState({ uploads: newUploads });
  };

  getUsers = async () => {
    for (let i = 1; i <= this.state.userCount; i++) {
      const user = await this.state.soundchain.methods.users(i).call();
      this.setState({ users: [...this.state.users, user] });
    }
  };

  updateUploads = async () => {
    const upload = await this.state.soundchain.methods
      .uploads(this.state.uploadCount)
      .call();
    this.setState({ uploads: [...this.state.uploads, upload] });
  };

  updateBalance = async () => {
    const { web3, account } = this.state;
    const wallet = await web3.eth.getBalance(account);
    let balance = web3.utils.fromWei(wallet, "ether");
    balance = parseFloat(balance).toFixed(3);
    this.setState({ balance });
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  uploadMedia = async (title, price) => {
    this.setState({ loading: true });
    const result = await ipfs.add(this.state.buffer);
    const hash = result.path;

    const { account, soundchain, uploads } = this.state;
    for (let i = 0; i < uploads.length; i++) {
      if (hash === uploads[i].hash_value) {
        alert("This song has been already uploaded !");
        this.setState({ loading: false });
        return;
      }
    }
    await soundchain.methods
      .uploadMedia(hash, title, price)
      .send({ from: account });

    this.getUploadCount(true);
    this.getUploads();
    this.updateBalance();
    this.setState({ loading: false });
  };

  likeMedia = async (id) => {
    const { soundchain, account } = this.state;
    this.setState({ loading: true });
    await soundchain.methods.likeMedia(id).send({ from: account });
    await this.getUploadCount();
    await this.getLiked();
    this.updateBalance();
    this.setState({ loading: false, searchInput: "" });
  };

  tipMedia = async (id, amount) => {
    const { soundchain, account, web3 } = this.state;
    const amt = web3.utils.toWei(amount.toString(), "Ether");
    this.setState({ loading: true });
    await soundchain.methods.tipMedia(id).send({ from: account, value: amt });
    await this.getUploadCount();
    this.updateBalance();
    this.setState({ loading: false, searchInput: "" });
  };

  buyMedia = async (id, price) => {
    const { soundchain, account, web3 } = this.state;
    this.setState({ loading: true });
    const amt = web3.utils.toWei(price.toString(), "Ether");
    await soundchain.methods.buyMedia(id).send({ from: account, value: amt });
    this.updateBalance();
    this.getBought();
    this.setState({ loading: false, searchInput: "" });
  };

  getBought = async () => {
    const { soundchain, account } = this.state;
    const boughtSongs = await soundchain.methods.getBought(account).call();
    this.setState({ bought: boughtSongs });
  };

  getLiked = async () => {
    const { soundchain, account, liked } = this.state;
    const likes = await soundchain.methods.getLiked(account).call();
    this.setState({ liked: likes });
  };

  changeLinkHandler = (currentActiveLink) => {
    this.setState({ currentActiveLink });
  };

  searchHandler = (value) => {
    this.setState({ searchInput: value });
  };

  sortHandler = async (value) => {
    const sortedUploads = this.state.uploads;
    this.setState({ sortBy: value });
    if (value === "likes") {
      sortedUploads.sort((a, b) =>
        a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
      );
    } else if (value === "tips") {
      sortedUploads.sort((a, b) =>
        a.tipsCollected < b.tipsCollected
          ? 1
          : b.tipsCollected < a.tipsCollected
          ? -1
          : 0
      );
    } else {
      this.getUploads();
      return;
    }

    this.setState({ uploads: sortedUploads });
  };

  listenSong = async () => {
    const { account, soundchain, loading } = this.state;
    await soundchain.methods.listenSong(account).send({ from: account });
  };

  render() {
    if (!this.state.web3) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 300,
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
    if (this.state.loading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 300,
          }}
        >
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div className="App">
        <Row style={{ height: "65px" }}>
          <Col span={24}>
            <Header
              changeLinkHandler={this.changeLinkHandler}
              currentActiveLink={this.state.currentActiveLink}
              searchHandler={this.searchHandler}
              sortBy={this.state.sortBy}
              sortHandler={this.sortHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Body
              account={this.state.account}
              balance={this.state.balance}
              loading={this.state.loading}
              uploadCount={this.state.uploadCount}
              uploads={this.state.uploads}
              currentActiveLink={this.state.currentActiveLink}
              bought={this.state.bought}
              liked={this.state.liked}
              searchInput={this.state.searchInput}
              user={this.state.user}
              sortBy={this.state.sortBy}
              uploadMedia={this.uploadMedia}
              captureFile={this.captureFile}
              likeMedia={this.likeMedia}
              tipMedia={this.tipMedia}
              buyMedia={this.buyMedia}
              listenSong={this.listenSong}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
