import "./App.css";
import { StoicIdentity } from "ic-stoic-identity";
import { useState } from "react";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import ClaimCard from "./components/claim-card";
import SwapCard from "./components/swap-card";

function App() {
  const [identity, setIdentity] = useState<Identity | null>(null);

  const handleConnect = async () => {
    let identity = await StoicIdentity.load();
    if (identity !== false) {
      setIdentity(identity);
    } else {
      //No existing connection, lets make one!
      identity = await StoicIdentity.connect();
      setIdentity(identity);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      WIP
    </div>
  );
}

export default App;
