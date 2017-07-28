import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styleSheet = createStyleSheet('SimpleSnackbar', (theme) => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
}));

class SimpleSnackbar extends Component {
  constructor(props) {
    super(props);

    this._handleRequestClose = this._handleRequestClose.bind(this);
    this.state = {
      message: null
    };
  }

  _handleRequestClose(event, reason) {
    this.props.onClose && this.props.onClose();
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  }

  render() {
    const { className } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={this.props.open}
          autoHideDuration={5000}
          onRequestClose={this._handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
            className
          }}
          message={<span id="message-id">{ this.props.message }</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this._handleRequestClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

export default withStyles(styleSheet)(SimpleSnackbar);
