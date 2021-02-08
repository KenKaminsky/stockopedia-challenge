import { ApolloServer } from 'apollo-server-express';
import env from 'dotenv';
import { Express } from 'express';
import resolvers from './resolvers';
import typeDefs from './schema';
import dataSources from './data_sources';
import mongoose from 'mongoose';
env.config();

const isDev = process.env.NODE_ENV === 'development';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  playground: isDev,
  introspection: isDev,
});

export const attachApollo = (app: Express): void => {
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
    onHealthCheck: () =>
      // eslint-disable-next-line no-undef
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve(true);
        } else {
          reject();
        }
      }),
  });
};
