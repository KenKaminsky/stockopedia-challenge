import {
  gql,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: ' http://localhost:8081/graphql',
  fetch: fetch,
});

export default new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: ApolloLink.from([httpLink]),
});
