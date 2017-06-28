import React from 'react';
import {Typography} from 'material-ui';
import T from 'i18n-react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet2 = createStyleSheet('Footer', (theme) => ({
  'footer__legal': {
    display: 'flex',
    marginBottom: theme.spacing.unit * 3,
    flexDirection: 'column',
    textAlign: 'center'
  },
  'footer__link': {
    color: theme.palette.accent.link
  }
}));

const Footer = ({ classes }) => {
  return (
    <div className={ classes.footer__legal }>
      <Typography type="caption">{T.translate('DATA_DISCLAIMER')}</Typography>
      <Typography type="caption">
        {T.translate('DATA_CREDIT_COINCAP', {
          link: <a className={ classes.footer__link }
            href="https://coincap.io"
            rel="noopener noreferrer"
            target="_blank">https://coincap.io</a>})}
      </Typography>
      <Typography type="caption">{T.translate('DATA_CREDIT_CRYPTOCOMPARE', {
        link: <a className={ classes.footer__link }
          href="https://www.cryptocompare.com/"
          rel="noopener noreferrer"
          target="_blank">https://www.cryptocompare.com/</a>})}
      </Typography>
      <Typography type="caption" style={{ direction: 'ltr' }}>{T.translate('CORPORATE')}</Typography>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet2)(Footer);
