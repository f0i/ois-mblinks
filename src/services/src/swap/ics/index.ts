import { Principal } from "@dfinity/principal";
import { ISwapStrategy } from "..";
import { Actors } from "../../actors";
import { IcsPoolSwapService } from "../../ics-swap";
import { PoolMetadata } from "../../ics-swap/interface";
import { TokenStandard } from "../../token/tokenAdapter";
import { HandleDeposit } from "./deposit";
import { HandleSwap, swap } from "./swap"
import {
  HandleWithdraw
} from "./withdraw";


const instance: ICSSwapStrategy | undefined = undefined;

export class ICSSwapStrategy implements ISwapStrategy {
  private handleSwap: HandleSwap;
  private depositToPool: HandleDeposit;
  private withdrawFromPool: HandleWithdraw;

  constructor({
    handleSwap,
    depositToPool,
    withdrawFromPool,
  }: {
    handleSwap: HandleSwap;
    depositToPool: HandleDeposit;
    withdrawFromPool: HandleWithdraw;
  }) {
    this.handleSwap = handleSwap;
    this.depositToPool = depositToPool;
    this.withdrawFromPool = withdrawFromPool;
  }

  public async executeSwap({
    principal,
    amount,
    pool,
    zeroForOne,
    slipage,
    actors,
  }: {
    principal: Principal;
    amount: number;
    pool: string;
    zeroForOne: boolean;
    slipage: number;
    actors: Actors;
  }): Promise<bigint> {
    let icsPoolSwapService = IcsPoolSwapService.getInstance(pool, actors);
    const metadata: PoolMetadata = await icsPoolSwapService.getMetadata();
    let token0 = metadata.token0.address
    let token0Standard = metadata.token0.standard as TokenStandard
    let token1 = metadata.token1.address
    let token1Standard = metadata.token1.standard as TokenStandard

    try {
      await this.depositToPool({
        token0,
        token0Standard,
        token1,
        token1Standard,
        pool,
        zeroForOne,
        amount,
        actors,
      });

      await this.handleSwap({
        amount,
        pool,
        zeroForOne,
        slipage,
        actors,
      });

      const result = await this.withdrawFromPool({
        principal,
        token0,
        token0Standard,
        token1,
        token1Standard,
        pool,
        zeroForOne,
        withdraw_amount: 0,
        actors,
      });

      return result;
    } catch (error) {
      console.log("error at swap method", error);
      throw error;
    }

  }

  public static getInstance({
    handleSwap,
    depositToPool,
    withdrawFromPool,
  }: {
    handleSwap: HandleSwap;
    depositToPool: HandleDeposit;
    withdrawFromPool: HandleWithdraw;
  }) {
    if (!instance) {
      return new ICSSwapStrategy({
        handleSwap: swap,
        depositToPool: depositToPool,
        withdrawFromPool: withdrawFromPool,
      });
    }
    return instance;
  }

}
