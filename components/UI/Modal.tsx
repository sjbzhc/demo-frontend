import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Card from './Card';
import classes from './Modal.module.css';

const Modal = ({
  title, message, onCancel, onConfirm,
}) => (
  <div
    className={classes.backdrop}
    onClick={onCancel}
    role="button"
    tabIndex="0"
  >
    <Card
      className={classes.modal}
      title={title}
    >
      <div>
        {message}
      </div>
      <footer className={classes.actions}>
        <Button onClick={onCancel} color="secondary">Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </footer>
    </Card>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
