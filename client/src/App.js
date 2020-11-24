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
    uploads: [],
    balance: null,
    loading: true,
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

  getUploads = async () => {
    for (let i = 1; i <= this.state.uploadCount; i++) {
      const upload = await this.state.soundchain.methods.uploads(i).call();
      this.setState({ uploads: [...this.state.uploads, upload] });
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

  uploadMedia = async (title) => {
    const result = await ipfs.add(this.state.buffer);
    const hash = result.path;

    const { accounts, soundchain } = this.state;
    await soundchain.methods
      .uploadMedia(hash, title)
      .send({ from: accounts[0] });
    this.setState({ loading: true });
    this.getUploadCount(true);
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
        <h1>{this.state.uploadCount} uploads yet !</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await this.uploadMedia(this.title.value);
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
              this.title = input;
            }}
          />
          <br />
          <button type="submit">Upload file</button>
        </form>

        {this.state.uploads.map((upload, key) => {
          return (
            <div key={key}>
              <audio
                controls
                src={`https://ipfs.infura.io/ipfs/${upload.hash_value}`}
                alt="Loading"
              />
              {upload.title}
            </div>
          );
        })}
        <Landing />
      </div>
    );
  }
}

export default App;
