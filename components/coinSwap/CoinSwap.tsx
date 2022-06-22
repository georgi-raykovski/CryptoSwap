import Moralis from "moralis/types";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { availableCoinsData } from "../../lib/constants";
import { coinSwapSelectData } from "../constants";
import { initialSwapState, ISwapState } from "../interfaces";
import { buttonStyles, coinSwapStyles } from "../styles";
import CoinSwapInput from "./CoinSwapInput";
import CoinSwapSelect from "./CoinSwapSelect";

const CoinSwap = () => {
  const [swapState, setSwapState] = useState<ISwapState>(initialSwapState);
  const [error, setError] = useState<string>("");
  const { Moralis, user, isAuthenticated } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !Moralis.web3) {
      Moralis.enableWeb3();
    }
  }, [isAuthenticated, Moralis]);

  const sendEth = async (): Promise<void> => {
    const contractAddress = swapState.toAddress.coinAddress;

    const options = {
      type: "native" as Moralis.TransferType,
      amount: Moralis.Units.ETH(swapState.amount.toString()),
      receiver: contractAddress,
    };

    const transaction = await Moralis.transfer(options);
    // @ts-ignore: Unreachable code error
    await transaction.wait();
  };

  const swapTokens = async (): Promise<void> => {
    if (swapState.fromAddress.coinAddress === swapState.toAddress.coinAddress) {
      setError("Both coins cannot be the same");
      return;
    }

    const fromOptions = {
      type: "erc20" as Moralis.TransferType,
      amount: Moralis.Units.Token(swapState.amount, 18),
      receiver: swapState.fromAddress.coinAddress,
      contractAddress: swapState.fromAddress.coinAddress,
    };

    const toMintOptions = {
      contractAddress: swapState.toAddress.coinAddress,
      functionName: "mint",
      abi: swapState.toAddress.coinDai,
      params: {
        to: user?.get("ethAddress"),
        amount: Moralis.Units.Token(swapState.amount, 18),
      },
    };

    const fromTransaction = await Moralis.transfer(fromOptions);
    const toMintTransaction = await Moralis.executeFunction(toMintOptions);
    // @ts-ignore: Unreachable code error
    await fromTransaction.wait();
    // @ts-ignore: Unreachable code error
    await toMintTransaction.wait();
  };

  const buttonClickHandler = async () => {
    setError("");
    if (swapState.fromAddress.coinAddress === availableCoinsData.eth.coinAddress) {
      const contractAddress = swapState.toAddress.coinAddress;
      const abi = swapState.toAddress.coinDai;
      const options = {
        contractAddress,
        functionName: "mint",
        abi,
        params: {
          to: user?.get("ethAddress"),
          amount: Moralis.Units.Token(swapState.amount),
        },
      };
      sendEth();
      const transaction = await Moralis.executeFunction(options);
      // @ts-ignore: Unreachable code error
      await transaction.wait(4);
    } else {
      swapTokens();
    }
  };

  const selectChangeHandler = (name: string, value: string): void => {
    const selectedAddress = availableCoinsData[value as keyof typeof availableCoinsData];

    name === "from"
      ? setSwapState((prevState) => ({
          ...prevState,
          fromAddress: selectedAddress,
        }))
      : setSwapState((prevState) => ({
          ...prevState,
          toAddress: selectedAddress,
        }));
  };

  const inputChangeHandler = (value: string) => {
    setSwapState((prevState) => ({
      ...prevState,
      amount: value,
    }));
  };

  return (
    <div className={coinSwapStyles.coinSwapCointainer}>
      <CoinSwapSelect selectChangeHandler={selectChangeHandler} {...coinSwapSelectData.from} />
      <CoinSwapSelect selectChangeHandler={selectChangeHandler} {...coinSwapSelectData.to} />
      <CoinSwapInput inputChangeHandler={inputChangeHandler} />
      {error && <p className={coinSwapStyles.coinSwapError}>{error}</p>}
      <button
        className={buttonStyles.coinSwap}
        disabled={!isAuthenticated}
        onClick={buttonClickHandler}
      >
        {isAuthenticated ? "Swap" : "Please connect wallet"}
      </button>
    </div>
  );
};

export default CoinSwap;
