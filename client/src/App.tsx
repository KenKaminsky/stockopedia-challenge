import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from './apollo_client';
import './App.css';
import Page from './components/page';
import logo from './logo.svg';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Page />
      </div>
    </ApolloProvider>
  );
}

export default App;
