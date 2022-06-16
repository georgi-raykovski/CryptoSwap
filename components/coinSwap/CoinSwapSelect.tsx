import { availableCoinsData } from "../../lib/constants";
import { coinSwapStyles } from "../styles";

interface ICoinSwapSelectProps {
  name: string;
  labelText: string;
  selectChangeHandler: (name: string, value: string) => void;
}

const CoinSwapSelect = ({ name, labelText, selectChangeHandler }: ICoinSwapSelectProps) => {
  const coinNames = Object.keys(availableCoinsData);
  const availableCoins = name === "to" ? coinNames.filter((coin) => coin !== "eth") : coinNames;

  return (
    <div className={coinSwapStyles.coinSwapFormInputContainer}>
      <label className={coinSwapStyles.coinSwapLabel} htmlFor={name}>
        {labelText}
      </label>
      <select
        onChange={(e) => selectChangeHandler(name, e.target.value)}
        className={coinSwapStyles.coinSwapSelect}
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

export default CoinSwapSelect;
