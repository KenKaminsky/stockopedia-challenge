import { useEffect, useState } from 'react';
import { CURRENCIES } from '../../constants/currencies';
import useSubscription from './useSubscription';

type IRates = Record<string, number>;

const alternativeCurrencies = ['GBP', 'EUR', 'USD', 'JPY'] as const;

export type ICurrencyName = typeof alternativeCurrencies[number];

export interface ICurrency {
  id: string;
  name: ICurrencyName;
  rate: number;
  symbol: string;
}

export type ICurrencyMap = Record<ICurrencyName, ICurrency>;

const KEY = process.env.REACT_APP_API_KEY;
const API_BASE = `http://api.currencylayer.com/live`;
const CURRENCIES_SYMS = alternativeCurrencies.join(',');
const URL = `${API_BASE}?access_key=${KEY}&currencies=${CURRENCIES_SYMS}`;

const adjustToGBP = (usdRelativeRates: IRates): IRates => {
  const GBP = 1 / usdRelativeRates.USDGBP;
  return Object.fromEntries(
    Object.entries(usdRelativeRates).map(([key, val]) => [
      key.replace(/^USD/, ''),
      key === 'USDGBP' ? 1 : GBP * val,
    ]),
  );
};

export interface IAltCurrencies {
  currencies: ICurrency[];
  isLoading: boolean;
  error: Error | null;
  updateCurrency: (currency: ICurrency) => void;
}

const DEFAULT_CURRENCY: ICurrency = CURRENCIES.GBP;

const useAltCurrencies = (): IAltCurrencies => {
  const [currencies] = useState(Object.values(CURRENCIES));
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [currency, updateCurrency] = useState<ICurrency>(DEFAULT_CURRENCY);

  const { changeCurrency } = useSubscription();

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (!data?.success) {
          changeCurrency(DEFAULT_CURRENCY);
          setError(
            new Error(
              `Could not get rates for [${currency.name}]. Reverting to [${DEFAULT_CURRENCY.name}]`,
            ),
          );
        } else if (data?.quotes) {
          setError(null);
          const rates = adjustToGBP(data.quotes);
          changeCurrency({ ...currency, rate: rates[currency.name] });
        }
      });
  }, [currency, changeCurrency]);

  return { currencies, isLoading, error, updateCurrency };
};

export default useAltCurrencies;
