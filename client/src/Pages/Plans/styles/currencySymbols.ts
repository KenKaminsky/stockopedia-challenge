import { ICurrencyName } from '../../../apollo_client/types';

export type ICurrencySymbol = Record<ICurrencyName, string>;

const currencySymbol: ICurrencySymbol = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

export default currencySymbol;
