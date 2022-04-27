import {
  ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession, signIn } from 'next-auth/client';
import { useMemo } from 'react';

let apolloClient;

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

function createApolloClient() {
  const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();

    if (session === null) {
      signIn();
    }

    return {
      headers: {
        ...headers,
        authorization: session.idToken ? `Bearer ${session.idToken}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: new HttpLink({
    //   uri: 'http://localhost:8080/graphql',
    // }),
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

export function initializeApollo(initialState = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
  },
}));

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
