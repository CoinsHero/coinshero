import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import T from 'i18n-react';
import MenuIcon from 'material-ui-icons/Menu';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('NavigationHeader', (theme) => ({
  'root': {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    position: 'static'
  }
}));

class NavigationHeader extends Component {
  render() {
    return (
      <AppBar className={this.props.classes['root']}>
        <Toolbar>
          <IconButton color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title">{T.translate('NAVIGATION_HEADER_TITLE')}</Typography>
          <Tabs onChange={() => {}} index={0}>
            <Tab icon={<MonetizationOn />} label={T.translate('TAB_MARKET')} />
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  }
}

NavigationHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default withStyles(styleSheet)(NavigationHeader);
