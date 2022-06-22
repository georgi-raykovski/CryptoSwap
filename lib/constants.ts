import usdc from "./Usdc.json";
import doge from "./Dogecoin.json";
import { isDataView } from "util/types";

export const usdsDai = usdc.abi;
export const dogeDai = doge.abi;

export const usdcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const dogeAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
export const ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export type DaiType = typeof usdsDai | typeof dogeDai | {};
export type AddressType = typeof usdcAddress | typeof dogeAddress | typeof ethAddress | "";

export interface ICoinData {
  coinDai: DaiType;
  coinAddress: AddressType;
}

export enum AvailableCoins {
  usdc = "usdc",
  doge = "doge",
  eth = "eth",
}

type IAvailableCoinsData = {
  [key in AvailableCoins]: ICoinData;
};

export const availableCoinsData: IAvailableCoinsData = {
  usdc: {
    coinDai: usdsDai,
    coinAddress: usdcAddress,
  },
  doge: {
    coinDai: dogeDai,
    coinAddress: dogeAddress,
  },
  eth: {
    coinDai: {},
    coinAddress: ethAddress,
  },
};
