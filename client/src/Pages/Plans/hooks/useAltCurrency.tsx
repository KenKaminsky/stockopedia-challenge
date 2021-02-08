import { useEffect, useState } from 'react';
import { ICurrency } from '../../../apollo_client/types';
import useSubscription from './useSubscription';

type IRates = Record<string, number>;

interface IApiResponse {
  success: boolean;
  quotes: IRates;
}

const alternativeCurrencies = ['GBP', 'EUR', 'USD', 'JPY'] as const;

type ICurrencyName = typeof alternativeCurrencies[number];

export type ICurrencySymbol = Record<ICurrencyName, string>;

export const currencySymbols: ICurrencySymbol = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

const response: IApiResponse = {
  success: true,
  quotes: {
    USDEUR: 0.829941,
    USDGBP: 0.727987,
    USDJPY: 105.355504,
    USDUSD: 1,
  },
};

const KEY = process.env.REACT_APP_API_KEY;
const API_BASE = `http://api.currencylayer.com/live`;
const CURRENCIES = alternativeCurrencies.join(',');
const URL = `${API_BASE}?access_key=${KEY}&currencies=${CURRENCIES}`;

const adjustToGBP = (usdRelativeRates: IRates): IRates => {
  const GBP = 1 / usdRelativeRates.USDGBP;
  return Object.fromEntries(
    Object.entries(usdRelativeRates).map(([key, val]) => [
      key.replace(/^USD/, ''),
      key === 'USDGBP' ? 1 : GBP * val,
    ]),
  );
};

export interface IAltCurrency {
  updateCurrency: (currency: ICurrency) => void;
  error: Error | null;
  isLoading: boolean;
}

const DEFAULT_CURRENCY: ICurrency = { id: '1', name: 'GBP', rate: 1 };

const useAltCurrency = (): IAltCurrency => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [currency, updateCurrency] = useState<ICurrency>(DEFAULT_CURRENCY);

  const { changeCurrency } = useSubscription();

  useEffect(() => {
    setIsLoading(true);
    // fetch(URL)
    //   .then((res) => res.json())
    Promise.resolve(response).then((data) => {
      setIsLoading(false);
      if (!data?.success) {
        changeCurrency(DEFAULT_CURRENCY);
        setError(new Error(`Could not get rates for [${currency.name}]`));
      } else if (data?.quotes) {
        const rates = adjustToGBP(response.quotes);
        changeCurrency({ ...currency, rate: rates[currency.name] });
      }
    });
  }, [currency, changeCurrency]);

  return { isLoading, error, updateCurrency };
};

export default useAltCurrency;
