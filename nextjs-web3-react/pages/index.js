import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { abi } from "../constants/abi";
import { ethers } from "ethers";
import { useState, useEffect } from 'react'

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      setHasMetamask(true);
    }
  });

  const { active, activate, library: provider } = useWeb3React();

  async function connect() {
    if (typeof window.ethereum !== undefined) {
      try {
        await activate(injected);
        setHasMetamask(true);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please Install Metamask");
    }
  }

  return (
    <div>
      {hasMetamask ? (
        active ? (
          "Connected! "
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {active ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  );
}
