import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import classes from './course.module.css';
import { COURSE_BY_ID } from '../../graphql/queries/queries';
import UnitButton from '../../components/course/unit/UnitButton';
import HorizontalMenu from '../../components/course/horizontalMenu/HorizontalMenu';
import Video from '../../components/UI/Video';

const Course = () => {
  const router = useRouter();
  const [videoId, setVideoId] = useState('');
  const { id } = router.query;

  const { loading, data } = useQuery(COURSE_BY_ID, { variables: { courseId: id } });

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { course } = data;

  return (
    <div className={classes.courseLayout}>
      <div className={classes.container}>
        <div className={classes.titleCotainer}>
          <div className={classes.title}>{course.name}</div>
          <HorizontalMenu course={course} id={id} />
        </div>
        {videoId === '' ? <div>{course.description}</div> : <Video id={videoId} />}
      </div>
      <div className={classes.options}>
        <div className={classes.optionsTitle}><FormattedMessage id="course.menu.options.title" /></div>
        {course.units && course.units.map((unit) => (
          <UnitButton key={unit.name} unit={unit} setVideoId={setVideoId} />
        ))}
      </div>
    </div>
  );
};

export default Course;
