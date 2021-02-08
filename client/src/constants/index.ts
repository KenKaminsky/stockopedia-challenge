export const ALT_CURRENCIES = ['GBP', 'EUR', 'USD', 'JPY'] as const;

export type ICurrencyName = typeof ALT_CURRENCIES[number];

export interface ICurrency {
  id: string;
  name: ICurrencyName;
  rate: number;
  symbol: string;
}

export type ICurrencyMap = Record<ICurrencyName, ICurrency>;

export const CURRENCIES: ICurrencyMap = {
  USD: { id: '1', name: 'USD', rate: 1, symbol: '$' },
  EUR: { id: '2', name: 'EUR', rate: 1, symbol: '€' },
  GBP: { id: '3', name: 'GBP', rate: 1, symbol: '£' },
  JPY: { id: '4', name: 'JPY', rate: 1, symbol: '¥' },
};

export interface IFlags {
  gb: string;
  de: string;
  fr: string;
  us: string;
  jp: string;
}

export const FLAGS: IFlags = {
  jp: 'https://cdn.countryflags.com/thumbs/japan/flag-400.png',
  fr: 'https://cdn.countryflags.com/thumbs/france/flag-400.png',
  de: 'https://cdn.countryflags.com/thumbs/germany/flag-400.png',
  gb: 'https://cdn.countryflags.com/thumbs/united-kingdom/flag-400.png',
  us:
    'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png',
};

export type IBillingCycle = 'Monthly' | 'Annually';

export const BILLING_CYCLES: Array<IBillingCycle> = ['Annually', 'Monthly'];
