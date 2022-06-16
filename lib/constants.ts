import usdc from "./Usdc.json";
import doge from "./Dogecoin.json";
import { isDataView } from "util/types";

export const usdsDai = usdc.abi;
export const dogeDai = doge.abi;

export const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const dogeAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export const ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export type DaiType = typeof usdsDai | typeof dogeDai | {};
export type AddressType =
  | typeof usdcAddress
  | typeof dogeAddress
  | typeof ethAddress
  | "";

export interface ICoinData {
  coinDai: DaiType;
  coinAddress: AddressType;
}

type IAvailableCoinsData = {
  [key in AvailableCoins]: ICoinData;
};

export const availableCoinsData: IAvailableCoinsData = {
  'usdc': {
    coinDai: usdsDai,
    coinAddress: usdcAddress,
  },
  'doge': {
    coinDai: dogeDai,
    coinAddress: dogeAddress,
  },
  'eth': {
    coinDai: {},
    coinAddress: ethAddress,
  },
};

export enum AvailableCoins {
  usdc = "usdc",
  doge = "doge",
  eth = "eth",
}
