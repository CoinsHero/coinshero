import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import T from 'i18n-react';
import LightbulbIcon from 'material-ui-icons/LightbulbOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import { withTheme, withStyles, createStyleSheet } from 'material-ui/styles';
import {languages} from '../i18n';
import classnamesjss from '../helpers/classnamesjss';

import LanguageMenu from './LanguageMenu';

const styleSheet = createStyleSheet('NavigationHeader', (theme) => {
  const lightColor = theme.palette.primary[200];

  return ({
    root: {
      backgroundColor: lightColor,
      color: theme.palette.getContrastText(lightColor)
    },
    'root--dark-theme': {
      'background-color': theme.palette.accent['A400'],
      color: theme.palette.getContrastText(theme.palette.accent['A400'])
    },
    root__appBar: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    root__Tabs: {
      display: 'flex',
      flexGrow: 1
    },
    root_ToolBox: {
      padding: 0
    }
  });
});

class NavigationHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.locale.code !== nextProps.locale.code || this.props.theme !== nextProps.theme;
  }

  render() {
    const cx = classnamesjss(this.props.classes,
      'root',
      {'root--dark-theme': this.props.theme.palette.type === 'dark'}
    );
    let selectedLocaleIndex = 0;
    let locales = Object.values(languages);

    for (let index = 0; index < locales.length; index++) {
      if (locales[index].code === this.props.locale.code) {
        selectedLocaleIndex = index;
        break;
      }
    }

    return (
      <AppBar className={cx}>
        <div className={this.props.classes.root__appBar}>
          <Typography type="title">{T.translate('NAVIGATION_HEADER_TITLE')}</Typography>
          <Tabs onChange={() => {}} index={0} className={this.props.classes.root__Tabs}>
            <Tab icon={<MonetizationOn />} aria-label="Market" label={T.translate('TAB_MARKET')} />
          </Tabs>
          <Toolbar className={this.props.classes.root_ToolBox}>
            <LanguageMenu locales={locales} selectedIndex={selectedLocaleIndex} />
            <IconButton color="inherit" onClick={this.props.onThemeClick} aria-label="Toggle light/dark theme">
              <LightbulbIcon />
            </IconButton>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

NavigationHeader.propTypes = {
  onThemeClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default withTheme(withStyles(styleSheet)(NavigationHeader));
