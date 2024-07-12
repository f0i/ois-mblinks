import React from "react";
import stoicWalletLogo from "../../../assets/stoic-wallet-logo.png";

const ConnectWalletButton = ({
  handleConnect,
  disabled,
}: {
  handleConnect: () => void;
  disabled: boolean;
}) => (
  <button
    className="w-full text-stone-900 font-medium rounded-full text-center p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-150 disabled:opacity-50 disabled:scale-100 disabled:-translate-y-0"
    onClick={() => handleConnect()}
    disabled={disabled}
  >
    <span className="inline-flex items-center">
      <img
        className="pr-2"
        src={stoicWalletLogo}
        width={75}
        alt="Stoic Wallet"
      />
      <p className="pl-2">Connect Wallet</p>
    </span>
  </button>
);

export default ConnectWalletButton;
