import PropTypes from 'prop-types';

export const childrenShape = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.node,
  PropTypes.element,
]);
