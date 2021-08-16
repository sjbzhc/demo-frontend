import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { useModal } from '../../components/providers/ModalProvider';
import classes from './course.module.css';
import { COURSE_BY_ID } from '../../graphql/queries/queries';

const Course = () => {
  const intl = useIntl();
  const modalCtx = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { setDisplayModal, setModalConfig } = modalCtx;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div>
            <MoreHorizIcon
              className={classes.controlButton}
              onClick={handleClick}
            />
            <Menu
              id="course-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                setModalConfig(
                  {
                    title: intl.formatMessage({ id: 'course.exmatriculate.title' }),
                    message: intl.formatMessage({ id: 'course.exmatriculate.message' }),
                    onCancel: () => setDisplayModal(false),
                  },
                );
                setDisplayModal(true);
                handleClose();
              }}
              >
                <FormattedMessage id="course.menu.option.exmatriculate" />
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div>{course.description}</div>
      </div>
      <div className={classes.options}>Course progress</div>
    </div>
  );
};

export default Course;
