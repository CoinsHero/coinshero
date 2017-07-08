import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Toolbar, Typography } from 'material-ui';
import T from 'i18n-react';

import classnamesjss from '../helpers/classnamesjss';

import CoinsTable from './CoinsTable';
import SearchCoinsInput from './SearchCoinsInput';
import TargetCurrencyMenu from './TargetCurrencyMenu';

const styleSheet = createStyleSheet('CoinsPage', (theme) => ({
  root: {
    width: '92%',
    marginBottom: theme.spacing.unit * 3
  },
  root_ToolBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0
  },
  root__ToolBar__LeftPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1
  },
  root__ToolBar__RightPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  'root__ToolBar__RightPanel__update-time-hidden': {
    transition: 'opacity 2s ease-in-out',
    opacity: 0
  },
  'root__ToolBar__RightPanel__update-time-visible': {
    opacity: 1
  }
}));

class CoinsPage extends Component {
  constructor(props) {
    super();

    this.state = {
      displayedValuePairs: props.coinsData.valuePairs,
      searchQuery: ''
    };
  }

  _performDataManipulation(options) {
    let displayedValuePairs = options.valuePairs;

    if (options.dataManipulations) {
      const nextSearchQuery = options.dataManipulations.searchQuery;

      if (nextSearchQuery !== '') {
        // Search query has been entered by the user
        displayedValuePairs = options.valuePairs.filter((pair) => {
          return pair.baseCurrency.displayName.match(new RegExp(nextSearchQuery, 'i'));
        });
      }
    }

    return displayedValuePairs;
  }

  _onSearchChange(searchQuery) {
    const displayedValuePairs = this._performDataManipulation({
      valuePairs: this.props.coinsData.valuePairs,
      dataManipulations: {
        searchQuery
      }
    });

    this.setState({searchQuery, displayedValuePairs});
  }

  componentWillReceiveProps(nextProps) {
    const displayedValuePairs = this._performDataManipulation({
      valuePairs: nextProps.coinsData.valuePairs,
      dataManipulations: {
        searchQuery: this.state.searchQuery
      }
    });

    this.setState({displayedValuePairs});
  }

  _renderUpdateTime(updateTimestamp) {
    const cx = classnamesjss(this.props.classes,
      'root__ToolBar__RightPanel__update-time-hidden',
      {'root__ToolBar__RightPanel__update-time-visible': updateTimestamp}
    );

    return (
      <Typography className={cx}>
        {T.translate('LAST_UPDATE_TIME', {time: new Date(updateTimestamp).toLocaleString(this.props.locale.code)})}
      </Typography>
    );
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Toolbar className={this.props.classes.root_ToolBar}>
          <div className={this.props.classes.root__ToolBar__LeftPanel}>
            <SearchCoinsInput autoFocus={true} isRTL={this.props.locale.isRTL} onChange={this._onSearchChange.bind(this)}/>
            <TargetCurrencyMenu />
            <Typography type="caption">{ T.translate('USD_EURO_AVAILABLE') }</Typography>
          </div>
          <div className={this.props.classes.root__ToolBar__RightPanel}>
            {this._renderUpdateTime(this.props.coinsData.updateTimestamp)}
          </div>
        </Toolbar>
        <CoinsTable locale={this.props.locale}
          showLoading={this.props.showLoading}
          valuePairs={this.state.displayedValuePairs} />
      </div>
    );
  }
}

CoinsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  coinsData: PropTypes.shape({
    valuePairs: PropTypes.arrayOf(PropTypes.object),
    updateTimestamp: PropTypes.number
  }),
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  showLoading: PropTypes.bool.isRequired
};

export default withStyles(styleSheet)(CoinsPage);
