import { Identity } from "@dfinity/agent";
import { Card, CardContent } from "../ui/card";
import ConnectWalletButton from "../ui/buttons/ConnectWalletButton";

import monkey from "../../assets/Monkey-OIS.png";
import { Action } from "@/types/Action.type";

const SwapCard = ({
  identity,
  action,
  handleConnect,
  handleSwap,
}: {
  identity: Identity | null;
  action: Action;
  handleConnect: () => void;
  handleSwap: (amount: number) => Promise<bigint | undefined>;
}) => {
  // TODO: get data from action

  return (
    <Card className="border-green-500 shadow-md bg-black m-5 card">
      {/* --------------------  Start the card --------------------  */}
      <CardContent className="m-3 pt-2">
        <div className="rounded-md border p-5 border-green-500 bg-black">
          <div className="container mx-auto">
            <img
              src={monkey}
              alt="IC-Monkey-OIS"
              width={400}
              className="mx-auto"
            />{" "}
            {/* --------------------  NFT Image --------------------  */}
          </div>
          <div className="text-center">
            <div className="mt-3 grid grid-rows-1 grid-flow-col gap-3 text-sm">
              {action.labels.map((label, index) => (
                <button
                  key={index}
                  className="font-medium rounded-full p-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* ----------------------- Card title ----------------------- */}
        <div>
          <h1 className="text-lime-500 text-start text-3xl pt-5 font-bold">
            {action.title}
          </h1>
        </div>
        {/* ----------------------- Prices ----------------------- */}
        <div className="grid grid-cols-2 text-start pt-2">
          <div>
            <span className="inline-flex items-center">
              <img
                src="https://cryptologos.cc/logos/internet-computer-icp-logo.svg?v=032"
                width={25}
                alt="IC-logo"
              ></img>

              <p className="ml-2 text-lime-500">0.54 ICP</p>
            </span>
          </div>
          <div>
            <p className="text-white">$12.56 USD</p>
          </div>
        </div>
        {/* ----------------------- Description ----------------------- */}
        <div className="text-start text-xs pt-5">
          <div className="inline-flex items-center pr-5">
            <i className="fa-solid fa-star text-lime-500"></i>
            <p className="pl-1 text-white font-bold">@username</p>
          </div>
          <div className="inline-flex items-center p-1">
            <i className="fa-solid fa-star text-lime-500"></i>
            <p className="pl-1 text-white">xhandle</p>
          </div>
          <div className="inline-flex items-center p-1">
            <i className="fa-solid fa-star text-lime-500"></i>
            <p className="pl-1 text-white">website</p>
          </div>
          <div className="inline-flex items-center p-1">
            <i className="fa-solid fa-star text-lime-500"></i>
            <p className="pl-1 text-white">link</p>
          </div>
        </div>
        <div className="auto-cols-max pt-2">
          <p className="text-white text-start">{action.description}</p>
        </div>
        {/* ----------------------- Claim buttons ----------------------- */}
        <div className="grid grid-cols-3 pt-5 text-center">
          {action.actions.map((item, index) => {
            const [, amount] = item.action.split("#");

            return (
              <button
                key={index}
                className="text-white font-medium rounded-full p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150"
                onClick={() => handleSwap(Number(amount))}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* ----------------------- Connect button if identity is NULL ----------------------- */}

        {/* Insert the logic of the if/else statement here
          for the identification of the wallet.
          The following code can show itself if the identity is null. */}
        {!identity && <ConnectWalletButton handleConnect={handleConnect} />}

        {/* End of the piece of code. */}
      </CardContent>
    </Card>
  );
};

export default SwapCard;
