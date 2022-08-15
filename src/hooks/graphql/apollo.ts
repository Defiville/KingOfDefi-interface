import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/defiville/kod',
  cache: new InMemoryCache(),
});