import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import classes from './navigation.module.css';

function Navigation() {
  const [session, loading] = useSession();

  const isLoggedIn = !loading && session;

  return (
    <header className={classes.header}>
      <Link href="/"><FormattedMessage id="main.title" /></Link>
      <nav>
        <ul>
          {isLoggedIn && (
          <li>
            <Link href="/profile"><FormattedMessage id="profile.title" /></Link>
          </li>
          )}
          {!isLoggedIn && (
          <li>
            <Link href="/login"><FormattedMessage id="login.title" /></Link>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
