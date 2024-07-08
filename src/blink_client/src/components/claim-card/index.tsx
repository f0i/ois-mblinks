import { Identity } from "@dfinity/agent";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import gif from "../../assets/main.gif";

const ClaimCard = ({
  identity,
  balance,
  handleGetBalance,
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
    <Card className="border-yellow-200 shadow-md">
      <CardContent className="mt-5">
        {/* <h1>Balance: {balance}</h1>
        <Button className="w-full mr-1" onClick={handleGetBalance}>
          Refresh Balance
        </Button> */}
        <div className="w-80 mb-2">
          <img src={gif} alt="IC-PEDRO-ICP-OIS" />
        </div>
        <div className="mb-1">PEDRO biggest airdrop contest</div>
        {identity ? (
          <Button
            className="w-full mt-4 bg-yellow-300 hover:bg-yellow-400"
            onClick={handleClaim}
          >
            Claim 1 Pedro
          </Button>
        ) : (
          <Button
            className="w-full mt-4 bg-yellow-300 hover:bg-yellow-400"
            onClick={handleConnect}
          >
            Connect wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimCard;
