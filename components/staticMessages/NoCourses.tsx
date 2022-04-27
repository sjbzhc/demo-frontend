import Link from 'next/link';
import { useIntl } from 'react-intl';
import classes from './noCourses.module.css';

const NoCourses = () => {
  const intl = useIntl();
  return (
    <div className={classes.container}>
      <div className={classes.messageBox}>
        <div className={classes.title}>{intl.formatMessage({ id: 'courses.no.courses.message' })}</div>
        <div className={classes.message}>
          {intl.formatMessage({ id: 'courses.no.courses.message.link' })}
          <Link href="/courses">{intl.formatMessage({ id: 'courses.title' })}</Link>
        </div>
      </div>
    </div>
  );
};

export default NoCourses;
