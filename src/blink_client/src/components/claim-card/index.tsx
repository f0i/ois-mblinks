import { Identity } from "@dfinity/agent";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import ConnectWalletButton from "../ui/buttons/ConnectWalletButton";
import gif from "../../assets/main.gif";
import { Actors, ClaimAirdropService } from "@lib/services";
import { VAULT_CANISTER_ID } from "@/constant";

const ClaimCard = ({
  identity,
  handleConnect,
}: {
  identity: Identity | null;
  handleConnect: () => void;
}) => {
  const handleClaim = async () => {
    const actors = new Actors().withIdentity(identity!);
    await ClaimAirdropService.getInstance({
      canisterId: VAULT_CANISTER_ID,
      actors,
    }).claimAirdrop();
  };

  return (
    <Card className="border-green-500 shadow-md bg-black m-5 card">
      {/* --------------------  Start the card --------------------  */}
      <CardContent className="m-3 pt-2">
        {identity ? (
          <>
            <img src={gif} alt="gif" className="mx-auto" />
            <div>
              <h1 className="text-lime-500 text-start text-3xl pt-5 font-bold">
                Pedro's Airdrop
              </h1>
            </div>
            <Button
              className="w-full mt-4 bg-gradient-to-r from-lime-300 to-green-500"
              onClick={handleClaim}
            >
              Claim
            </Button>
          </>
        ) : (
          <ConnectWalletButton handleConnect={handleConnect} />
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimCard;
