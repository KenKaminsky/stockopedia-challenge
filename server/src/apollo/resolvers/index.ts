export default {
  Query: {
    plans: (_, __, { dataSources }) => dataSources.planAPI.getPlans(),
  },
};
