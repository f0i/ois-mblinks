import { ITokenService } from "./interface/ITokenService";
import { Principal } from "@dfinity/principal";
import EXT, { Metadata } from "./interface/ext";

export class ExtTokenService implements ITokenService {
  public readonly actor: EXT;
  public readonly decimals: number = 1e8;

  constructor({ actor, decimals }: { actor: EXT; decimals?: number }) {
    this.actor = actor;
    if (decimals) {
      this.decimals = 1 * Math.pow(10, decimals);
    }
  }
  approve(input: { fee: [] | [bigint]; memo: [] | [Uint8Array | number[]]; from_subaccount: [] | [Uint8Array | number[]]; created_at_time: [] | [bigint]; amount: bigint; expected_allowance: [] | [bigint]; expires_at: [] | [bigint]; spender: { owner: Principal; subaccount: [] | [Uint8Array | number[]]; }; }): Promise<bigint> {
    throw new Error("Method not implemented.");
  }

  transfer(input: { to: { owner: Principal; subaccount: [] | [Uint8Array | number[]] }; amount: bigint; fee: [] | [bigint]; memo: [] | [Uint8Array | number[]]; from_subaccount: [] | [Uint8Array | number[]]; created_at_time: [] | [bigint]; }): Promise<bigint> {
    throw new Error("Method not implemented.");
  }

  getDecimals(): number {
    return Math.log10(this.decimals);
  }
  async balanceOf(address: string): Promise<number> {
    const balance = await this.actor.balance({
      token: "",
      user: {
        principal: Principal.fromText(address),
      },
    });

    return Number(balance) / this.decimals;
  }
  async name(): Promise<string> {
    const metadata = await this.actor.metadata();
    if ("ok" in metadata && "fungible" in metadata.ok) {
      return metadata.ok.fungible.name;
    } else if ("err" in metadata) {
      throw new Error("error occured");
    }
    throw new Error("error occured");
  }
  async symbol(): Promise<string> {
    const metadata = await this.actor.metadata();
    if ("ok" in metadata && "fungible" in metadata.ok) {
      return metadata.ok.fungible.symbol;
    } else if ("err" in metadata) {
      console.log(metadata.err);
      throw new Error("error occured");
    }
    throw new Error("error occured");
  }
  async totalSupply(): Promise<number> {
    const totalSupplyBigInt = await this.actor.supply();
    if ("err" in totalSupplyBigInt) {
      console.log(totalSupplyBigInt.err);
      throw new Error("error occured");
    }
    if ("ok" in totalSupplyBigInt) {
      return Number(totalSupplyBigInt.ok) / this.decimals;
    }

    throw new Error("error occured");
  }
  async getFee(): Promise<bigint> {
    const fee = await this.actor.getFee();
    if ("err" in fee) {
      console.log(fee.err);
      throw new Error("error occured");
    }
    if ("ok" in fee) {
      return fee.ok;
    }
    throw new Error("error occured");
  }
  async getBurnedAmountInDeadWallet(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  async getBurnedAmmount(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  async holdPercentage(address: string): Promise<number> {
    const totalSupply = await this.totalSupply();
    const balance = await this.balanceOf(address);
    return balance / totalSupply;
  }

  async getMetadata(): Promise<Metadata> {
    const metadata = await this.actor.metadata();
    if ("ok" in metadata) {
      return metadata.ok;
    }
    throw new Error("error occured");
  }

  async getLogo(): Promise<string> {
    const result = await this.actor.logo();
    if ("ok" in result) {
      return result.ok;
    }
    throw new Error("error occured");
  }
}
