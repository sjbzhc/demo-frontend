import PropTypes from 'prop-types';
import classes from './video.module.css';

const Video = ({ id }) => (
  <div className={classes.video}>
    <iframe
      width={853}
      height={480}
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Youtube"
    />
  </div>
);

Video.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Video;
