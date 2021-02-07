export interface ICurrency {
  id: string;
  name: ICurrencyName;
  rate: number;
}

export interface IPlan {
  id: string;
  name: string;
  code: keyof IFlags;
  monthlyCost: number;
  annualCost: number;
}

export interface IData {
  currencies: ICurrency[];
  plans: IPlan[];
}

export interface IIdentifiable {
  id: string;
  name: string;
}

export interface IFlags {
  gb: string;
  de: string;
  fr: string;
  us: string;
  jp: string;
}

export type ICurrencyName = 'GBP' | 'EUR' | 'USD' | 'JPY';

export type IBillingCycle = 'Monthly' | 'Annually';
