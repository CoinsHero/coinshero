import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import T from 'i18n-react';
import {Tabs, Tab} from 'material-ui/Tabs';
import EditorMonetizationOn from 'material-ui/svg-icons/editor/monetization-on';

class NavigationHeader extends Component {
  render() {
    const titleStyle = this.props.locale.isRTL ? {
      marginRight: '20px'
    } : null;

    return (
      <AppBar title={T.translate('NAVIGATION_HEADER_TITLE')} titleStyle={titleStyle}>
        <Tabs>
          <Tab
            icon={<EditorMonetizationOn />}
            label={T.translate('TAB_MARKET')}
          />
        </Tabs>
      </AppBar>
    );
  }
}

NavigationHeader.propTypes = {
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default NavigationHeader;
