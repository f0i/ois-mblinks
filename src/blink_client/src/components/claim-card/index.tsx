import { Identity } from "@dfinity/agent";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import ConnectWalletButton from "../ui/buttons/ConnectWalletButton.js";

const ClaimCard = ({
  identity,
  handleClaim,
  handleConnect,
}: {
  identity: Identity | null;
  balance: number;
  handleGetBalance: () => void;
  handleClaim: () => void;
  handleConnect: () => void;
}) => {
  return (
    <Card className="border-green-500 shadow-md bg-black m-5 card">
      {/* --------------------  Start the card --------------------  */}
      <CardContent className="m-3 pt-2">
        {identity ? (
          <Button
            className="w-full mt-4 bg-gradient-to-r from-lime-300 to-green-500"
            onClick={handleClaim}
          >
            Claim 1 Pedro
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimCard;
