import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import CurrencyAPI from './datasources/currencies';
import DiscountAPI from './datasources/discounts';
import RegionAPI from './datasources/regions';
import resolvers from './resolvers';
import typeDefs from './schema';

import env from 'dotenv';
env.config();

const dataSources = () => ({
  currencyAPI: new CurrencyAPI(),
  regionAPI: new RegionAPI(),
  discountAPI: new DiscountAPI(),
});

const isDev = process.env.NODE_ENV === 'development';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  playground: isDev,
  introspection: isDev,
  // tracing: true,
});

export const attachApollo = (app: Express) => {
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
    // onHealthCheck: () =>
    //   // eslint-disable-next-line no-undef
    //   new Promise((resolve, reject) => {
    //     if (mongoose.connection.readyState > 0) {
    //       resolve();
    //     } else {
    //       reject();
    //     }
    //   }),
  });
};
