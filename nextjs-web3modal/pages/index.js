import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnet/web3-provider"

let web3Modal;

const providerOptions = {
  walletConnect: {
    pacakage: WalletConnectProvider,
    options: {
      rpc: {42: process.env.NEXT_PUBLIC_RPC_URL}
    },
  },
}

if( typeof window.ethereum !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false, 
    providerOptions,
  })
}

export default function Home() {

  async function connect() {
    const web3ModalProvider = await web3Modal.connect();
  }
  return (
    <div className={styles.container}>
     
    </div>
  )
}
