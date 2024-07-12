import { StoicIdentity } from "ic-stoic-identity";
import { useState } from "react";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import SwapCard from "../components/swap-card";
import { Action } from "@/types/Action.type";
import { Actors, IcsPoolSwapService } from "@lib/services";
import { HOST } from "@/constant";
import { Principal } from "@dfinity/principal";
import { ICSSwapStrategy } from "@lib/services/src/swap/ics";

const mockAction: Action = {
  title: "Magic swap OIS",
  icon: "",
  description: "Swap ICP to ckBTC with Monkey Magic OIS",
  labels: ["On-chain", "ckBTC", "ICP"],
  metadata: {
    mockKey: "Mock Value",
  },
  actions: [
    {
      label: "0.01 ICP",
      action: "SWAP#0.01",
    },
    {
      label: "0.1 ICP",
      action: "SWAP#0.1",
    },
    {
      label: "0.2 ICP",
      action: "SWAP#0.2",
    },
  ],
};

function SwapPage() {
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

  const handleSwap = async (amount: number) => {
    if (!identity) {
      throw "Wallet is not connected";
    }
    console.log("Swapping token");
    const httpAgent = new HttpAgent({
      fetch: window.fetch.bind(window),
      host: HOST,
    });
    const actors = new Actors(httpAgent).withIdentity(identity!);

    const input: {
      principal: Principal;
      amount: number;
      pool: string;
      zeroForOne: boolean;
      slipage: number;
    } = {
      principal: identity.getPrincipal(),
      amount: amount * Math.pow(10, 8),
      pool: "xmiu5-jqaaa-aaaag-qbz7q-cai",
      zeroForOne: false, // swap ICP to ckBTC
      slipage: 0.5,
    };
    console.log(input);

    const result = await ICSSwapStrategy.getInstance({
      actors,
    }).executeSwap(input);
    console.log("result", result);
    console.log("Successfully swapped token");
    return result;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <SwapCard
        action={mockAction}
        identity={identity}
        handleConnect={handleConnect}
        handleSwap={handleSwap}
      />
    </div>
  );
}

export default SwapPage;
