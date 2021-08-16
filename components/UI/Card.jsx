import PropTypes from 'prop-types';
import { childrenShape } from '../../shapes/shapes';
import classes from './Card.module.css';

const Card = ({
  className, children, title, clickHandler,
}) => (
  <div
    className={`${classes.card} ${className}`}
    onClick={clickHandler}
    role="button"
    tabIndex="0"
  >
    <div className={classes.title}>{title}</div>
    {children}
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: childrenShape.isRequired,
  title: PropTypes.string,
  clickHandler: PropTypes.func,
};

Card.defaultProps = {
  className: '',
  title: '',
  clickHandler: () => {},
};

export default Card;
