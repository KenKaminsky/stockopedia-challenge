import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@material-ui/core';
import React from 'react';
import client from './apollo_client';
import Plans from './Plans';

function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Plans />
    </ApolloProvider>
  );
}

export default App;
