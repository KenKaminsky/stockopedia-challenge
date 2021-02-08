import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BASE_URL,
  fetch: fetch,
});

export default new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: ApolloLink.from([httpLink]),
});
