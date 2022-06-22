import { useMemo } from "react";
import { formattedCurrencyArray } from "../constants/availableCurrency";
import { availableMarkets } from "../constants/availableMarkets";
import CryptoFilter from "./CryptoFilter";

interface ICryptoTableFiltersProps {
  filterChangeHandler: (name: string, value: string) => void;
}

const CryptoTableFilters = ({ filterChangeHandler }: ICryptoTableFiltersProps) => {
  const filters = useMemo(() => {
    return [
      {
        labelText: "Available markets",
        name: "market",
        id: "market",
        optionsData: availableMarkets,
        selectChangeHandler: (name: string, value: string) => filterChangeHandler(name, value),
      },
      {
        labelText: "Available digital currencies",
        name: "currency",
        id: "currency",
        optionsData: formattedCurrencyArray,
        selectChangeHandler: (name: string, value: string) => filterChangeHandler(name, value),
      },
      {
        labelText: "Days",
        name: "days",
        id: "days",
        optionsData: Array.from(Array(30).keys()).map((key: number) => (key + 1).toString()),
        selectChangeHandler: (name: string, value: string) => filterChangeHandler(name, value),
      },
      {
        labelText: "Interval",
        name: "interval",
        id: "interval",
        optionsData: ["hourly", "daily"],
        selectChangeHandler: (name: string, value: string) => filterChangeHandler(name, value),
      },
    ];
  }, [filterChangeHandler]);

  return (
    <div className="grid gap-6 mx-auto w-10/12 mb-6 lg:grid-cols-4 items-end">
      {filters.map((filter, index) => (
        <CryptoFilter key={index} {...filter} />
      ))}
    </div>
  );
};

export default CryptoTableFilters;
