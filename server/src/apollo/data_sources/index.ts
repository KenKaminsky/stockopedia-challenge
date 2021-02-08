import CurrencyAPI from './currencies';
import PlanAPI from './plans';

const dataSources = () => ({
  currencyAPI: new CurrencyAPI(),
  planAPI: new PlanAPI(),
});

export default dataSources;
