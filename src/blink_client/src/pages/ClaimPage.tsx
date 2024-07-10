import { StoicIdentity } from "ic-stoic-identity";
import { useState } from "react";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import ClaimCard from "../components/claim-card";

function ClaimPage() {
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
      <ClaimCard identity={identity} handleConnect={handleConnect} />
    </div>
  );
}

export default ClaimPage;
