import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import MultiaxisLineChart from "../MultiaxisLineChart";
import SkeletonLoader from "../SkeletonLoader";
import { formattedCurrencyArray } from "./availableCurrency";
import { availableMarkets } from "./availableMarkets";
import CryptoTableFilters from "./CryptoTableFilters";

interface IEndpoint {
  symbol: string | number;
  market: string | number;
  endpoint: string;
}

const endpointConstants = {
  apiRoot: "https://api.coingecko.com/api/v3/coins/",
  initialEndpoint:
    "https://api.coingecko.com/api/v3/coins/" +
    formattedCurrencyArray[0].id +
    "/market_chart?vs_currency=" +
    availableMarkets[0] +
    "&days=14&interval=daily",
};

const CryptoTable = () => {
  const [endpointState, setEndpointState] = useState<IEndpoint>({
    symbol: formattedCurrencyArray[0].id,
    market: availableMarkets[0],
    endpoint: endpointConstants.initialEndpoint,
  });

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
          endpointConstants.apiRoot +
          prevState.symbol +
          "/market_chart?vs_currency=" +
          value +
          "&days=14&interval=daily",
      }));
    } else {
      setEndpointState((prevState) => ({
        ...prevState,
        symbol: value,
        endpoint:
          endpointConstants.apiRoot +
          value +
          "/market_chart?vs_currency=" +
          prevState.market +
          "&days=14&interval=daily",
      }));
    }
  }, []);

  return (
    <div>
      <CryptoTableFilters filterChangeHandler={filterChangeHandler} />
      {isLoading && <SkeletonLoader />}
      {/* <SkeletonLoader /> */}
      {!isLoading && isSuccess && <MultiaxisLineChart coinPriceData={formattedCoinData} />}
    </div>
  );
};

export default CryptoTable;
