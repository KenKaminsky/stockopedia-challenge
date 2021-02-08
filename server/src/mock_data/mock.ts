import Currency from '../models/currency';
import Plan from '../models/plan';

const gb = new Plan({
  code: 'gb',
  name: 'UK',
  monthlyCost: 10,
  annualCost: 50,
});
const fr = new Plan({
  code: 'fr',
  name: 'France',
  monthlyCost: 10,
  annualCost: 60,
});
const de = new Plan({
  code: 'de',
  name: 'Germany',
  monthlyCost: 15,
  annualCost: 75,
});
const us = new Plan({
  code: 'us',
  name: 'USA',
  monthlyCost: 25,
  annualCost: 150,
});
const jp = new Plan({
  code: 'jp',
  name: 'Japan',
  monthlyCost: 15,
  annualCost: 65,
});

export const plans = [gb, fr, de, us, jp];

const gbp = new Currency({ name: 'GBP', rate: 1 });
const eur = new Currency({ name: 'EUR', rate: 1.14 });

export const currencies = [gbp, eur];
