import React, { Component } from "react";
import SoundChainContract from "./contracts/SoundChain.json";
import getWeb3 from "./getWeb3";
import Landing from "./containers/Landing/index";
import "./App.css";

class App extends Component {
  state = { balance: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const wallet = await web3.eth.getBalance(accounts[0])
      let balance = web3.utils.fromWei(wallet, 'ether')
      balance = parseFloat(balance).toFixed(3)
      

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SoundChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SoundChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      //const balance = await web3.eth.getBalance(accounts)
      //console.log(balance)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ balance,web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const {accounts, balance} = this.state
    return (
      <div className="App">
        <Landing account={accounts} balance={balance}/>
      </div>
    );
  }
}

export default App;
