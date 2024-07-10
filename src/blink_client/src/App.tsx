import "./App.css";
import { StoicIdentity } from "ic-stoic-identity";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { idlFactory as vaultIDL } from "./idl/vault.did";
import { idlFactory as tokenIDL } from "./idl/token.did";
import { _SERVICE as TokenActor } from "./idl/token.type";
import { Principal } from "@dfinity/principal";
import ClaimCard from "./components/claim-card";
import { HOST, TOKEN_CANISTER_ID, VAULT_CANISTER_ID } from "./constant";
import SwapCard from "./components/swap-card";

const getBalance = async (pricipal: Principal) => {
  const agent = new HttpAgent({
    host: HOST,
    logToConsole: true,
  });
  agent.fetchRootKey();

  const actor: TokenActor = Actor.createActor(tokenIDL, {
    agent: agent,
    canisterId: TOKEN_CANISTER_ID,
  });
  const decimals = await actor.icrc1_decimals();

  const balance = await actor.icrc1_balance_of({
    owner: pricipal,
    subaccount: [],
  });

  const result = Number(balance) / 10 ** Number(decimals);

  return result;
};

function App() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const handleConnect = async () => {
    let identity = await StoicIdentity.load();
    if (identity !== false) {
      setIdentity(identity);
    } else {
      //No existing connection, lets make one!
      identity = await StoicIdentity.connect();
      setIdentity(identity);
    }
    await handleGetBalance();
  };

  const handleClaim = async () => {
    if (!identity) {
      return;
    }

    const agent = new HttpAgent({
      identity,
      host: HOST,
    });
    agent.fetchRootKey();

    const actor = Actor.createActor(vaultIDL, {
      agent: agent,
      canisterId: VAULT_CANISTER_ID,
    });

    await actor.claim();
    const balance = await getBalance(identity.getPrincipal());
    setBalance(Number(balance));
  };

  const handleGetBalance = async () => {
    if (!identity) {
      return;
    }

    const balance = await getBalance(identity.getPrincipal());
    setBalance(Number(balance));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <SwapCard identity={identity} handleConnect={handleConnect} />
    </div>
  );
}

export default App;
