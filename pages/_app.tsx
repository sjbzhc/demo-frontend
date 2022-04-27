/* eslint-disable react/prop-types */
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { IntlProvider } from 'react-intl';
import { ModalProvider } from '../components/providers/ModalProvider';
import Layout from '../components/Layout';
import './index.css';
import { useApollo } from '../apollo-client';
import messagesEn from '../translations/en.json';

const messages = {
  en: messagesEn,
};

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <IntlProvider locale="en" messages={messages.en}>
      <Provider session={pageProps.session}>
        <ApolloProvider client={client}>
          <ModalProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </ApolloProvider>
      </Provider>
    </IntlProvider>
  );
}

export default MyApp;
