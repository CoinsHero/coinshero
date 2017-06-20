import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import T from 'i18n-react';
import LightbulbIcon from 'material-ui-icons/LightbulbOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('NavigationHeader', (theme) => ({
  'root': {
    'background-color': theme.palette.type === 'dark' ? theme.palette.accent['A400'] : theme.palette.primary[600],
    'color': theme.palette.getContrastText(theme.palette.type === 'dark' ? theme.palette.accent['A400'] : theme.palette.primary[500]),
    'position': 'static'
  },
  'root__tabs': {
    display: 'flex',
    flexGrow: 1
  }
}));

class NavigationHeader extends Component {
  render() {
    return (
      <AppBar className={this.props.classes['root']}>
        <Toolbar>
          <Typography type="title">{T.translate('NAVIGATION_HEADER_TITLE')}</Typography>
          <Tabs onChange={() => {}} index={0} className={this.props.classes['root__tabs']}>
            <Tab icon={<MonetizationOn />} aria-label="Market" label={T.translate('TAB_MARKET')} />
          </Tabs>
          <IconButton color="inherit" onClick={this.props.onThemeClick} aria-label="Toggle light/dark theme">
            <LightbulbIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

NavigationHeader.propTypes = {
  onThemeClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default withStyles(styleSheet)(NavigationHeader);
