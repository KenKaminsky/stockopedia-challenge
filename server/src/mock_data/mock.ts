import Currency from '../models/currency';
import Discount from '../models/discount';
import Plan from '../models/plan';
import Region from '../models/region';

const annual = new Discount({ name: 'Annual', description: '...', amount: 0.1 });
const quarter = new Discount({ name: 'QUarter', description: '...', amount: 0.05 });

export const discounts = [annual, quarter];

const uk = new Region({
  name: 'UK',
  flag: 'img_uri',
  description: 'United Kingdom',
  listPrice: 55,
  netPrice: 55 * 0.9, //'list - sum(discounts)',
  discounts: annual,
});

const europe = new Region({
  name: 'Europe',
  flag: 'img_uri',
  description: '29+ Countries (incl UK)',
  listPrice: 425,
  netPrice: 425 * 0.9,
  discounts: quarter,
});

europe.save((err, doc) => console.log('****************** ', doc, err));

export const regions = [uk, europe];

const endOfTrial = Date.now() + 3600 * 24 * 14;

const gbp = new Currency({ name: 'GBP', rate: 1 });
const eur = new Currency({ name: 'EUR', rate: 1.14 });

export const currencies = [gbp, eur];

const plan = new Plan({
  name: 'Best Plan',
  description: 'Somthing...',
  account: 'ken.k.kaminksy@gmail.com',
  billinPeriod: 'Annual',
  regions: regions,
  total: 350,
  currency: gbp,
  isActive: true,
  isTrial: true,
  trialEnd: endOfTrial,
  cratedOn: Date.now(),
  billingDate: endOfTrial,
});

export const plans = [plan];
