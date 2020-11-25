import React, { Component } from "react";
import SoundChainContract from "./contracts/SoundChain.json";
import getWeb3 from "./getWeb3";
import Landing from "./containers/Landing/index";
import "./App.css";

import ipfsClient from "ipfs-http-client";
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    soundchain: null,
    buffer: null,
    uploadCount: null,
    userCount: null,
    uploads: [],
    users: [],
    balance: null,
    loading: true,
    balance: 0
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await web3.eth.getBalance(accounts[0]);

      let balance = web3.utils.fromWei(wallet, "ether");
      balance = parseFloat(balance).toFixed(3);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SoundChainContract.networks[networkId];

      const soundchain = new web3.eth.Contract(
        SoundChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState(
        { web3, accounts, soundchain, balance },
        this.getUploadCount
      );
    } catch (error) {
      alert(`Failed to load. Please install MetaMask`);
      console.error(error);
    }

    this.getUserCount();
    this.getUsers();
  };

  getUploadCount = async (newUpload) => {
    const { soundchain, web3, accounts } = this.state;
    const uploadCount = await soundchain.methods.uploadCount().call();
    if (newUpload) {
      this.setState({ uploadCount, loading: false }, this.updateUploads);
    } else {
      this.setState({ uploadCount, loading: false }, this.getUploads);
    }
    const wallet = await web3.eth.getBalance(accounts[0]);
    let balance = web3.utils.fromWei(wallet, "ether");
    balance = parseFloat(balance).toFixed(3); 
    this.setState({balance: balance})
  };

  getUserCount = async () => {
    const {soundchain} = this.state
    const userCount = await soundchain.methods.userCount().call();
    this.setState({userCount})
  }

  getUploads = async () => {
    for (let i = 1; i <= this.state.uploadCount; i++) {
      const upload = await this.state.soundchain.methods.uploads(i).call();
      this.setState({ uploads: [...this.state.uploads, upload] });
    }
  };

  getUsers = async () => {
    for(let i = 1; i <= this.state.userCount; i++) {
      const user = await this.state.soundchain.methods.users(i).call();
      this.setState({users: [...this.state.users, user]})
    }
  }

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

  uploadMedia = async (title) => {
    const result = await ipfs.add(this.state.buffer);
    const hash = result.path;

    const { accounts, soundchain} = this.state;
    await soundchain.methods
      .uploadMedia(hash, title)
      .send({ from: accounts[0] });
    this.setState({ loading: true });
    this.getUploadCount(true);
  };

  render() {
    const {accounts, balance, uploadCount, uploads, userCount, users} = this.state
    console.log(userCount, users)
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (this.state.loading) {
      return (
        <div>
          <h1>Fetching data from Blockchain</h1>
        </div>
      );
    }
    return (
      <div className="App">
        <Landing account={accounts} balance={balance} uploadCount={uploadCount} captureFile={this.captureFile} uploadMedia={this.uploadMedia} uploads={uploads}/>
      </div>
    );
  }
}

export default App;
