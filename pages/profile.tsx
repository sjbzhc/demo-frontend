import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import PropTypes from 'prop-types';
import Card from '../components/UI/Card';
import { MY_COURSES } from '../graphql/queries/queries';
import NoCourses from '../components/staticMessages/NoCourses';
import classes from './profile.module.css';

const Profile = ({ user }) => {
  const router = useRouter();
  const { loading, data } = useQuery(MY_COURSES);

  if (!user) {
    return (<div>Loading...</div>);
  }

  if (!loading && data && data.myCourses.length === 0) {
    return (<NoCourses />);
  }
  return (
    <>
      <div className={classes.cardsLayout}>
        {!loading && data.myCourses.map((course, index) => (
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
