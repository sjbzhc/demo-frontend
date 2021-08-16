import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
  Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    // idToken: true,
  }),
];

const pages = { signIn: '/login' };

async function refreshAccessToken(token) {
  try {
    const url = `https://oauth2.googleapis.com/token?${
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      })}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const callbacks = {
  async jwt(token, user, account) {
    if (account?.accessToken) {
      token.accessToken = account.accessToken;
    }

    if (account && account.idToken) {
      token.idToken = account.idToken;
    }

    if (account && user) {
      token.accessToken = account.accessToken;
      token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      token.refreshToken = account.refresh_token;
      token.user = user;
    }

    if (Date.now() < token.accessTokenExpires) {
      return token;
    }

    return refreshAccessToken(token);
  },
  async session(session, token) {
    if (token) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.idToken = token.idToken;
    }

    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages,
  idToken: true,
  secret: process.env.GOOGLE_SECRET,
};

const auth = (req, res) => NextAuth(req, res, options);

export default auth;
