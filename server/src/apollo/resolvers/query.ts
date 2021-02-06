export default {
  currencies: (_, __, { dataSources }) => dataSources.currencyAPI.getCurrencies(),
  discounts: (_, __, { dataSources }) => dataSources.discountAPI.getDiscounts(),
  regions: (_, __, { dataSources }) => dataSources.regionAPI.getRegions(),
};
