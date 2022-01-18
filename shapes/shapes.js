import PropTypes from 'prop-types';

export const childrenShape = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.node,
  PropTypes.element,
]);

export const unitShape = PropTypes.shape({
  name: PropTypes.string,
  content: PropTypes.string,
  videoId: PropTypes.string,
});

export const courseShape = PropTypes.shape({
  name: PropTypes.string,
  creatorId: PropTypes.string,
  description: PropTypes.string,
  participantIds: PropTypes.arrayOf(PropTypes.string),
  units: PropTypes.arrayOf(unitShape),
  videoId: PropTypes.string,
});
