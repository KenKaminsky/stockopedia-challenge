export interface IIdentifiable {
  id: string;
  name: string;
}

export interface IPlan extends IIdentifiable {
  code: keyof IFlags;
  monthlyCost: number;
  annualCost: number;
}

export interface IData {
  plans: IPlan[];
}

export interface IFlags {
  gb: string;
  de: string;
  fr: string;
  us: string;
  jp: string;
}

export type IBillingCycle = 'Monthly' | 'Annually';
