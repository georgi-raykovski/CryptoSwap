import { DigitalCurrencyOrMarket, ISelect } from "../interfaces";
import { coinSwapStyles } from "../styles";

interface ICryptoFilterProps extends ISelect {
  optionsData: DigitalCurrencyOrMarket[] | string[];
}

const isStringArray = (array: ICryptoFilterProps["optionsData"]): array is string[] => {
  return typeof array[0] === "string";
};

const CryptoFilter = ({
  name,
  labelText,
  selectChangeHandler,
  optionsData,
}: ICryptoFilterProps) => {
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
        {isStringArray(optionsData)
          ? optionsData.map((key, index) => {
              return (
                <option key={index} value={key}>
                  {name === "market"
                    ? key.toUpperCase()
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              );
            })
          : optionsData.map((key, index) => {
              return (
                <option key={index} value={key.id}>
                  {key.name}
                </option>
              );
            })}
      </select>
    </div>
  );
};

export default CryptoFilter;
