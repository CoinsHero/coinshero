import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('CircularIndeterminate', (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const CircularIndeterminate = (props) => {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <CircularProgress size={props.size} />
    </div>
  );
};

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number
};

CircularIndeterminate.defaultProps = {
  size: 50
};

export default withStyles(styleSheet)(CircularIndeterminate);
