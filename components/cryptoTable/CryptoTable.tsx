import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import MultiaxisLineChart from "./MultiaxisLineChart";
import SkeletonLoader from "../SkeletonLoader";
import { formattedCurrencyArray } from "../constants/availableCurrency";
import { availableMarkets } from "../constants/availableMarkets";
import CryptoTableFilters from "./CryptoTableFilters";
import { IEndpoint } from "../interfaces";
import { apiRoot } from "../constants";

const initialEndpointState = {
  symbol: formattedCurrencyArray[0].id,
  market: availableMarkets[0],
  days: "1",
  interval: "hourly",
  endpoint:
    apiRoot +
    formattedCurrencyArray[0].id +
    "/market_chart?vs_currency=" +
    availableMarkets[0] +
    "&days=1&interval=hourly",
};

const CryptoTable = () => {
  const [endpointState, setEndpointState] = useState<IEndpoint>(initialEndpointState);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpointState.endpoint]);

  const {
    data: coinData,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery(
    ["currency-daily", endpointState.endpoint],
    async ({ queryKey }) => {
      const response = await fetch(queryKey[1]);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    {
      refetchInterval: 100000,
    }
  );

  const formattedCoinData: number[] = coinData?.prices.map((price: number[]) => price[1]);

  const filterChangeHandler = useCallback((name: string, value: string) => {
    if (name === "market") {
      setEndpointState((prevState) => ({
        ...prevState,
        market: value,
        endpoint:
          apiRoot +
          prevState.symbol +
          "/market_chart?vs_currency=" +
          value +
          `&days=${prevState.days}&interval=${prevState.interval}`,
      }));
    }
    if (name === "days") {
      setEndpointState((prevState) => ({
        ...prevState,
        days: value,
        endpoint:
          apiRoot +
          prevState.symbol +
          "/market_chart?vs_currency=" +
          prevState.market +
          `&days=${value}&interval=${prevState.interval}`,
      }));
    }
    if (name === "interval") {
      setEndpointState((prevState) => ({
        ...prevState,
        interval: value,
        endpoint:
          apiRoot +
          prevState.symbol +
          "/market_chart?vs_currency=" +
          prevState.market +
          `&days=${prevState.days}&interval=${value}`,
      }));
    }
    if (name === "currency") {
      setEndpointState((prevState) => ({
        ...prevState,
        symbol: value,
        endpoint:
          apiRoot +
          value +
          "/market_chart?vs_currency=" +
          prevState.market +
          `&days=${prevState.days}&interval=${prevState.interval}`,
      }));
    }
  }, []);

  return (
    <div className="mb-6 py-5 w-full">
      <CryptoTableFilters filterChangeHandler={filterChangeHandler} />
      {isLoading && <SkeletonLoader />}
      {!isLoading && isSuccess && (
        <div className="p-16 w-4/6 mx-auto bg-emerald-100 rounded-lg">
          <MultiaxisLineChart coinPriceData={formattedCoinData} interval={endpointState.interval} />
        </div>
      )}
    </div>
  );
};

export default CryptoTable;
