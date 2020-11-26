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
    await this.getLiked()
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
    const result = await ipfs.add(this.state.buffer);
    const hash = result.path;

    const { account, soundchain } = this.state;
    this.setState({ loading: true });
    await soundchain.methods
      .uploadMedia(hash, title, price)
      .send({ from: account });

    this.getUploadCount(true);
    this.setState({ loading: false });
  };

  likeMedia = async (id) => {
    const { soundchain, account } = this.state;
    this.setState({ loading: true });
    await soundchain.methods.likeMedia(id).send({ from: account });
    await this.getUploadCount();
    this.setState({ loading: false });
  };

  tipMedia = async (id, amount) => {
    const { soundchain, account } = this.state;
    this.setState({ loading: true });
    await soundchain.methods
      .tipMedia(id)
      .send({ from: account, value: amount });
    await this.getUploadCount();
    this.setState({ loading: false });
  };

  buyMedia = async (id) => {
    const { soundchain, account } = this.state;
    this.setState({ loading: true });
    await soundchain.methods.buyMedia(id).send({ from: account });
    this.setState({ loading: false });
  };

  getBought = async () => {
    const { soundchain, account, bought } = this.state;
    const songs = await soundchain.methods.getBought(account).call();
    songs.forEach(async (id) => {
      const song = await soundchain.methods.uploads(id).call();
      bought = [...bought, song];
    });
    this.setState({ bought });
  };

  getLiked = async () => {
    const {soundchain, account, liked} = this.state
    const likes = await soundchain.methods.getLiked(account).call();
    this.setState({liked: likes}, () => console.log(this.state.liked))
  }

  changeLinkHandler = (currentActiveLink) => {
    this.setState({ currentActiveLink });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (this.state.loading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
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
              uploadMedia={this.uploadMedia}
              captureFile={this.captureFile}
              likeMedia={this.likeMedia}
              tipMedia={this.tipMedia}
              buyMedia={this.buyMedia}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
