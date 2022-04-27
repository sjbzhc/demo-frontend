import {
  providers, signIn, useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
import classes from './login.module.css';

// eslint-disable-next-line react/prop-types
const Login = ({ signInProviders }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && session) {
    router.push('/');
  }

  return (
    <>
      <div className={classes.container}>

        {!session && Object.values(signInProviders).map((provider) => (
          <div key={provider.name} className={classes.box}>
            <button type="button" className={`${classes.provider}`} onClick={() => signIn(provider.id)}>
              Sign in with
              {' '}
              {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Login;

export async function getStaticProps(context) {
  const signInProviders = await providers(context);
  return {
    props: {
      signInProviders,
    },
  };
}
