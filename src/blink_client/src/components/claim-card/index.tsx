import { HttpAgent, Identity } from "@dfinity/agent";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import ConnectWalletButton from "../ui/buttons/ConnectWalletButton";
import gif from "../../assets/main.gif";
import { Actors, ClaimAirdropService } from "@lib/services";
import { HOST, VAULT_CANISTER_ID } from "@/constant";
import { useState } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";

const ClaimCard = ({
  identity,
  handleConnect,
}: {
  identity: Identity | null;
  handleConnect: () => Promise<void>;
}) => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaim = async () => {
    if (!identity) {
      throw "Wallet is not connected.";
    }
    console.log("Claiming airdrop");
    const httpAgent = new HttpAgent({
      host: HOST,
    });
    const actors = new Actors(httpAgent).withIdentity(identity!);
    await ClaimAirdropService.getInstance({
      canisterId: VAULT_CANISTER_ID,
      actors,
    }).claimAirdrop();

    console.log("Airdrop claimed");
    // TODO: add something like toast notification instead of alert
    alert("Airdrop successfully claimed.");
  };

  const connectHandler = async () => {
    try {
      setError(null);
      setLoading(true);
      await handleConnect();
    } catch (err) {
      setError("Couldn't connect wallet: " + err);
    }
    setLoading(false);
  };

  const claimHandler = async () => {
    try {
      setError(null);
      setLoading(true);
      await handleClaim();
    } catch (err) {
      setError("Couldn't claim airdrop: " + err);
    }
    setLoading(false);
  };

  return (
    <Card className="border-green-500 shadow-md bg-black m-5 card">
      {/* --------------------  Start the card --------------------  */}
      <CardContent className="m-3 pt-2">
        <img src={gif} alt="gif" className="mx-auto" />
        <div>
          <h1 className="text-lime-500 text-start text-3xl pt-5 font-bold">
            Pedro's Airdrop
          </h1>
        </div>
        <div className="flex">
          <ErrorMessage
            error={error}
            setError={setError}
            className="max-w-5xl"
          />
        </div>
        {identity ? (
          <Button
            className="w-full mt-4 bg-gradient-to-r from-lime-300 to-green-500"
            onClick={claimHandler}
            disabled={loading}
          >
            Claim
          </Button>
        ) : (
          <ConnectWalletButton
            handleConnect={connectHandler}
            disabled={loading}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimCard;
