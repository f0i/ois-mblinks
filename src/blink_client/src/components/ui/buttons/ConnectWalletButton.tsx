import React from "react"; 
import stoicWalletLogo from "../../../assets/stoic-wallet-logo.png"; 
 
const ConnectWalletButton = ({ 
  handleConnect, 
}: { 
  handleConnect: () => void; 
}) => ( 
  <button 
    className="text-stone-900 font-medium" 
    onClick={() => handleConnect()} 
  > 
    <div className="rounded-full text-center p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150"> 
      <span className="inline-flex items-center"> 
        <img 
          className="pr-2" 
          src={stoicWalletLogo} 
          width={75} 
          alt="Stoic Wallet" 
        /> 
        <p className="pl-2">Connect Wallet</p> 
      </span> 
    </div> 
  </button> 
); 
 
export default ConnectWalletButton;