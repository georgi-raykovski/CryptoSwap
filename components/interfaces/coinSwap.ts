import { availableCoinsData, ICoinData } from "../../lib/constants";

export interface ISwapState {
  fromAddress: ICoinData;
  toAddress: ICoinData;
  userEthAddress: string;
  amount: number | string;
}

const firstCoinKey = Object.keys(availableCoinsData)[0];
const firstCoinInList =
  availableCoinsData[firstCoinKey as keyof typeof availableCoinsData];

export const initialSwapState: ISwapState = {
  amount: 0,
  fromAddress: firstCoinInList,
  toAddress: firstCoinInList,
  userEthAddress: "",
};
