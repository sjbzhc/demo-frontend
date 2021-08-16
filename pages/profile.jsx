import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import PropTypes from 'prop-types';
import Card from '../components/UI/Card';
import { ALL_COURSES_QUERY } from '../graphql/queries/queries';
import classes from './profile.module.css';

const Profile = ({ user }) => {
  const router = useRouter();
  const { loading, data } = useQuery(ALL_COURSES_QUERY);

  if (!user) {
    return (<div>Loading...</div>);
  }
  return (
    <>
      <div className={classes.cardsLayout}>
        {!loading && data.allCourses.map((course, index) => (
          <div
            key={course.id}
            className={classes.cardContainer}
            onClick={() => router.push(`/course/${course.id}`)}
            role="button"
            tabIndex={index}
          >
            <Card title={course.name}><div><div>{course.creator.name}</div></div></Card>
          </div>
        ))}
      </div>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Profile.defaultProps = {
  user: {},
};

export default Profile;
