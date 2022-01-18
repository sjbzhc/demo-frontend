import { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { useModal } from '../../providers/ModalProvider';
import { ENROLL_TO_COURSE, EXMATRICUALTE_FROM_COURSE } from '../../../graphql/queries/queries';
import { courseShape } from '../../../shapes/shapes';
import classes from './horizontalMenu.module.css';

const HorizontalMenu = ({ course, id }) => {
  const modalCtx = useModal();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [exmatriculate] = useMutation(EXMATRICUALTE_FROM_COURSE);
  const [enroll] = useMutation(ENROLL_TO_COURSE);
  const { setDisplayModal, setModalConfig } = modalCtx;

  return (
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
        {course.isEnrolled && (
        <MenuItem onClick={() => {
          setModalConfig(
            {
              title: intl.formatMessage({ id: 'course.exmatriculate.title' }),
              message: intl.formatMessage({ id: 'course.exmatriculate.message' }),
              onCancel: () => setDisplayModal(false),
              onConfirm: () => exmatriculate({ variables: { courseId: id } }),
            },
          );
          setDisplayModal(true);
          handleClose();
        }}
        >
          <FormattedMessage id="course.menu.option.exmatriculate" />
        </MenuItem>
        )}
        {!course.isEnrolled && (
        <MenuItem onClick={() => {
          setModalConfig(
            {
              title: intl.formatMessage({ id: 'course.enroll.title' }, { courseName: course.name }),
              message: intl.formatMessage({ id: 'course.enroll.message' }),
              onCancel: () => setDisplayModal(false),
              onConfirm: () => enroll({ variables: { courseId: id } }),
            },
          );
          setDisplayModal(true);
          handleClose();
        }}
        >
          <FormattedMessage id="course.menu.option.enroll" />
        </MenuItem>
        )}
      </Menu>
    </div>
  );
};

HorizontalMenu.propTypes = {
  course: courseShape.isRequired,
  id: PropTypes.string.isRequired,
};

export default HorizontalMenu;
