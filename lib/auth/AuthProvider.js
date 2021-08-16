import { ApolloProvider } from "@apollo/client";
import { useSession } from "next-auth/client";
import { createContext, useEffect } from "react";
import client, { useApollo } from "../../apollo-client";

const authContext = createContext();

const AuthProvider = ({ children, pageProps }) => {
  // const auth = useProvideAuth();
  const [session, loading] = useSession();

  useEffect(() => {
    // if (session?.error === "RefreshAccessTokenError") {
    //   signIn();
    // }
  }, [session]);

  // console.log('session111 :>> ', session);


  // const apolloClient = useApollo(pageProps.initialApolloState, idToken);

  return (
    <authContext.Provider value="testHERE">
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

// AuthProvider.getInitialProps = async (context) => {
//   const session = await getSession(context);

//   console.log('session :>> ', session);

//   if (!session.idToken) {
//     return {
//       props: {},
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: {
//       idToken: session.idToken,
//     }
//   }
// }

export default AuthProvider;
