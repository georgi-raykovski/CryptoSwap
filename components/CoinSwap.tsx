import Moralis from "moralis/types";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { availableCoinsData } from "../lib/constants";
import { IComponent } from "./interfaces";
import { initialSwapState, ISwapState } from "./interfaces/coinSwap";
import { buttonStyles } from "./styles";

interface ICoinSwapProps extends IComponent {}

const styles = {
  coinSwapCointainer: "px-5 py-2.5 border-2 rounded-xl w-1/3",
  coinSwapFormInputContainer: "mb-3",
  coinSwapLabel:
    "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",
  coinSwapInput:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  coinSwapSelect:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  coinSwapError: "font-medium mb-3 text-sm text-red-600 dark:text-red-500",
};

const CoinSwap = ({}: ICoinSwapProps) => {
  const [swapState, setSwapState] = useState<ISwapState>(initialSwapState);
  const [error, setError] = useState<string>("");
  const { Moralis, user, isAuthenticated } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.enableWeb3();
    }
  }, [isAuthenticated, Moralis]);

  const sendEth = async (): Promise<void> => {
    const contractAddress = availableCoinsData.usdc.coinAddress;

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
    if (
      swapState.fromAddress.coinAddress === availableCoinsData.eth.coinAddress
    ) {
      const contractAddress = swapState.toAddress.coinAddress;
      const abi = swapState.toAddress.coinDai;
      const options = {
        contractAddress,
        functionName: "mint",
        abi,
        params: {
          to: user?.get("ethAddress"),
          amount: Moralis.Units.Token(50),
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
    const selectedAddress =
      availableCoinsData[value as keyof typeof availableCoinsData];

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

  const coinSelect = (name: string, labelText: string): React.ReactElement => {
    const coinNames = Object.keys(availableCoinsData);
    const availableCoins =
      name === "to" ? coinNames.filter((coin) => coin !== "eth") : coinNames;

    return (
      <div className={styles.coinSwapFormInputContainer}>
        <label className={styles.coinSwapLabel} htmlFor={name}>
          {labelText}
        </label>
        <select
          onChange={(e) => selectChangeHandler(name, e.target.value)}
          className={styles.coinSwapSelect}
          name={name}
          id="fromCoin"
        >
          {availableCoins.map((key, index) => {
            return (
              <option key={index} value={key}>
                {key.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const inputChangeHandler = (value: string) => {
    setSwapState((prevState) => ({
      ...prevState,
      amount: value,
    }));
  };

  const coinInput = (): React.ReactElement => {
    return (
      <div className={styles.coinSwapFormInputContainer}>
        <label htmlFor="amount" className={styles.coinSwapLabel}>
          Amount
        </label>
        <input
          className={styles.coinSwapInput}
          type="text"
          name="amount"
          id="amount"
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className={styles.coinSwapCointainer}>
      {coinSelect("from", "From coin")}
      {coinSelect("to", "To coin")}
      {coinInput()}
      {error && <p className={styles.coinSwapError}>{error}</p>}
      <button
        className={buttonStyles.coinSwap}
        disabled={!isAuthenticated}
        onClick={buttonClickHandler}
      >
        Swap
      </button>
    </div>
  );
};

export default CoinSwap;
