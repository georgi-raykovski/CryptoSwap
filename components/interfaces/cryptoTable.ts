export type DigitalCurrencyOrMarket = {
  symbol: string | number;
  name: string;
  id: string;
};

export interface IEndpoint {
  symbol: string | number;
  market: string | number;
  days: string;
  interval: string;
  endpoint: string;
}