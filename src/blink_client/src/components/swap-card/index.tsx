import { Identity } from "@dfinity/agent";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import monkey from "../../assets/Monkey-OIS.png";
import stoicWalletLogo from "../../assets/stoic-wallet-logo.png";

import { Action } from "@/types/Action.type";

const SwapCard = ({
  identity,
  handleConnect,
}: {
  identity: Identity | null;
  handleConnect: () => void;
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
              <div className="col-start-2 rounded-full p-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
                <button className="font-medium">On-chain</button>
              </div>
              <div className="rounded-full p-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
                <button className="font-medium">Monkey</button>
              </div>
              <div className="rounded-full p-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
                <button className="font-medium">ICP</button>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------------- Card title ----------------------- */}
        <div>
          <h1 className="text-lime-500 text-start text-3xl pt-5 font-bold">
            Monkey Magic OIS
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
          <p className="text-white text-start">
            Marketplace for the world of digital art. Discover the works of
            famous designers and own their work.
          </p>
        </div>
        {/* ----------------------- Claim buttons ----------------------- */}
        <div className="grid grid-cols-3 pt-5 text-center">
          <div className="rounded-full p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
            <button className="text-white font-medium">1 ICP</button>
          </div>
          <div className="rounded-full p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
            <button className="text-white font-medium">5 ICP</button>
          </div>
          <div className="rounded-full p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
            <button className="text-white font-medium">10 ICP</button>
          </div>
        </div>

          {/* ----------------------- Connect button if identity is NULL ----------------------- */}

          {/* Insert the logic of the if/else statement here
          for the identification of the wallet.
          The following code can show itself if the identity is null. */}

          <div className="rounded-full text-center p-2 m-2 bg-gradient-to-r from-lime-300 to-green-500 transition ease-in delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150">
            <button className="text-stone-900 font-medium">
            <span className="inline-flex items-center">
              <img className="pr-2" src={stoicWalletLogo} width={75} alt="Stoic Wallet"/>
              <p className="pl-2">Connect Wallet</p>
              </span>
            </button>
          </div>

          {/* End of the piece of code. */}

      </CardContent>
    </Card>
  );
};

export default SwapCard;
