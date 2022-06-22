import { useState } from "react";
import { coinSwapStyles } from "../styles";

interface ICoinSwapInputProps {
  inputChangeHandler: (value: string) => void;
}

const CoinSwapInput = ({ inputChangeHandler }: ICoinSwapInputProps) => {
  return (
    <div className={coinSwapStyles.coinSwapFormInputContainer}>
      <label htmlFor="amount" className={coinSwapStyles.coinSwapLabel}>
        Amount
      </label>
      <input
        className={coinSwapStyles.coinSwapInput}
        type="text"
        name="amount"
        id="amount"
        onChange={(e) => inputChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default CoinSwapInput;
