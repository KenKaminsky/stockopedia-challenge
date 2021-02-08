export default {
  currencies: (_, __, { dataSources }) => dataSources.currencyAPI.getCurrencies(),
  plans: (_, __, { dataSources }) => dataSources.planAPI.getPlans(),
};
