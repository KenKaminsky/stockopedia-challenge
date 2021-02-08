import { IFlags } from '../constants';

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
