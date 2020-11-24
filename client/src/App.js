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
    uploads: [],
    uploadCount: null,
    loading: true,
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await web3.eth.getBalance(accounts[0])
      let balance = web3.utils.fromWei(wallet, 'ether')
      balance = parseFloat(balance).toFixed(3)
      

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SoundChainContract.networks[networkId];

      const instance = new web3.eth.Contract(
        SoundChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      //const balance = await web3.eth.getBalance(accounts)
      //console.log(balance)

      this.setState(
        { web3, accounts, soundchain: instance },
        this.getUploadCount
      );
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  getUploadCount = async () => {
    const { soundchain } = this.state;
    const uploads = await soundchain.methods.uploadCount().call();
    this.setState({ uploadCount: uploads, loading: false });
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({ buffer: Buffer(reader.result) });
      console.log("Buffer", this.state.buffer);
    };
  };

  uploadMedia = async (title) => {
    console.log("Uploading File");
    const result = await ipfs.add(this.state.buffer);
    const hash = result.path;

    const { accounts, soundchain } = this.state;

    await soundchain.methods
      .uploadMedia(hash, title)
      .send({ from: accounts[0] });
    const uploadCount = soundchain.methods.uploadCount().call();
    this.setState(uploadCount);
  };

  render() {
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
        <h1>{this.state.uploadCount} uploads yet</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const title = this.fileTitle.value;
            await this.uploadMedia(title);
          }}
        >
          <input
            type="file"
            accept=".mp3, .mov, .wav"
            onChange={this.captureFile}
          />
          <br />
          <input
            id="title"
            type="text"
            placeholder="Title goes here..."
            required
            ref={(input) => {
              this.fileTitle = input;
            }}
          />
          <br />
          <button type="submit">Upload file</button>
        </form>

        <Landing />
      </div>
    );
  }
}

export default App;
