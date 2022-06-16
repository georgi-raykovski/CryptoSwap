import { ChangeEvent } from "react";
import { formattedCurrencyArray } from "./availableCurrency";
import { availableMarkets } from "./availableMarkets";
import CryptoFilter from "./CryptoFilter";

interface ICryptoTableFiltersProps {
  filterChangeHandler: (name: string, value: string) => void;
}

const CryptoTableFilters = ({ filterChangeHandler }: ICryptoTableFiltersProps) => {
  const filters = [
    {
      labelText: "Available markets",
      name: "market",
      optionsData: availableMarkets,
      selectChangeHandler: (name: string, value: string) =>
        filterChangeHandler(name, value),
    },
    {
      labelText: "Available digital currencies",
      name: "currency",
      optionsData: formattedCurrencyArray,
      selectChangeHandler: (name: string, value: string) =>
        filterChangeHandler(name, value),
    },
  ];

  return (
    <div className="grid gap-6 mb-6 lg:grid-cols-2">
      {filters.map((filter, index) => 
        <CryptoFilter key={index} {...filter} />
      )}
    </div>
  );
};

export default CryptoTableFilters;
