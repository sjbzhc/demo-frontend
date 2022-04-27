import PropTypes from 'prop-types';
import { unitShape } from '../../../shapes/shapes';
import classes from './unitButton.module.css';

const UnitButton = ({ unit, setVideoId }) => (
  <div
    onClick={() => setVideoId(unit.videoId)}
    role="button"
    tabIndex={0}
    className={classes.container}
  >
    <div className={classes.title}>{unit.name}</div>
    <div>{unit.content}</div>
  </div>
);

UnitButton.propTypes = {
  unit: unitShape.isRequired,
  setVideoId: PropTypes.func.isRequired,
};

export default UnitButton;
