import React from 'react';
import {Typography} from 'material-ui';
import T from 'i18n-react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import config from 'config';

const styleSheet2 = createStyleSheet('Footer', (theme) => ({
  footer__legal: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 3,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 5%'
  },
  footer__link: {
    color: theme.palette.accent.link
  }
}));

const Footer = ({ classes }) => {
  /* eslint-disable max-len*/
  return (
    <div className={ classes.footer__legal }>
      <Typography type="caption">{T.translate('DATA_DISCLAIMER')}</Typography>
      <Typography type="caption">
        {T.translate('DATA_CREDIT_COINCAP', {
          link: <a className={ classes.footer__link }
            href={config.ORIGINS.COINS_IO}
            rel="noopener noreferrer"
            target="_blank">{config.ORIGINS.COINS_IO}</a>})}
      </Typography>
      <Typography type="caption">{T.translate('DATA_CREDIT_CRYPTOCOMPARE', {
        link: <a className={ classes.footer__link }
          href={config.ORIGINS.CRYPTO_COMPARE}
          rel="noopener noreferrer"
          target="_blank">{config.ORIGINS.CRYPTO_COMPARE}</a>})}
      </Typography>
      <Typography type="caption" style={{ direction: 'ltr' }}>{T.translate('CORPORATE')}</Typography>
      <span id="cdSiteSeal1">
        <Script url="//tracedseals.starfieldtech.com/siteseal/get?scriptId=cdSiteSeal1&amp;cdSealType=Seal1&amp;sealId=55e4ye7y7mb733d16a1d6375bb5a2ah907yy7mb7355e4ye734f3c3b008d44e6e" />
      </span>
    </div>
  );
  /* eslint-enable max-len*/
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet2)(Footer);
