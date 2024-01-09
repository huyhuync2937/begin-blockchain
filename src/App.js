import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: 0,
    web3: 0
  });
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        // provider.request({ method: "eth_requestAccounts" })
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })
      }
      else {
        console.error("please, Install metamask");
      }
    }
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3]);

  return (
    <div className='faucet-wrapper'>
      <div className='faucet'>
        <div className='balance-view text-blue-600/100'>
          Current Balance: <strong>10 ETH</strong>
        </div>
        <div>
          <button className='border-solid border-2 border-indigo-600'>Deposit</button>
          <button className='border-solid border-2 border-indigo-600'>Widra</button>
          <button className="border-solid border-2 border-indigo-600"
            onClick={() =>
              web3Api.provider.request({ method: "eth_requestAccounts" })
            }
          >Connection</button>
          <div>
            <strong>
              Account Address:
            </strong>
            {
              account ? account : "Accounts Denined"
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
