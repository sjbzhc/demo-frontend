import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

import classes from './navigation.module.css';

function Navigation() {
  const [session, loading] = useSession();
  const intl = useIntl();

  const isLoggedIn = !loading && session;

  return (
    <header className={classes.header}>
      <Link href="/"><FormattedMessage id="main.title" /></Link>
      <nav>
        <ul>
          {isLoggedIn && (
          <li>
            <Link href="/profile">{intl.formatMessage({ id: 'profile.title' })}</Link>
          </li>
          )}
          {!isLoggedIn && (
          <li>
            <Link href="/login">{intl.formatMessage({ id: 'login.title' })}</Link>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
