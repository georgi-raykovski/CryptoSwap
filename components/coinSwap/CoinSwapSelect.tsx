import { availableCoinsData } from "../../lib/constants";
import { ISelect } from "../interfaces";
import { coinSwapStyles } from "../styles";

interface ICoinSwapSelectProps extends ISelect {}

const CoinSwapSelect = ({ name, labelText, selectChangeHandler, id }: ICoinSwapSelectProps) => {
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
        id={id}
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
