import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Toolbar, Typography } from 'material-ui';
import T from 'i18n-react';

import config from 'config';
import classnamesjss from '../helpers/classnamesjss';

import BitcoinLogo from '../assets/images/bitcoin_logo.png';
import LitecoinLogo from '../assets/images/litecoin_logo.png';
import EthereumLogo from '../assets/images/ethereum_logo.png';
import SimpleSnackbar from './SimpleSnackbar';
import CoinsTable from './CoinsTable';
import SearchCoinsInput from './SearchCoinsInput';
import TargetCurrencyMenu from './TargetCurrencyMenu';

const styleSheet = createStyleSheet('CoinsPage', (theme) => ({
  root: {
    width: '95%',
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
  },
  root__ToolBar__DonateBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing.unit,
    background: 'linear-gradient(to bottom, #eeeeee 0%,#fafafa 100%)',
    padding: '2px 4px',
    border: '1px solid #ccc',
    boxShadow: '1px 1px 4px rgba(0,0,0,0.075), inset 1px 1px 0px rgba(255,255,255,0.8)',
    borderRadius: '2px 2px 2px 2px',
    cursor: 'pointer',
    '&:hover': {
      background: 'linear-gradient(to bottom, #fafafa 0%,#eeeeee 100%)'
    }
  },
  'root__ToolBar__DonateBar--rtl': {
    marginRight: theme.spacing.unit
  },
  'root__ToolBar__DonateBar--dark-theme': {
    color: theme.palette.accent['A400']
  },
  root__ToolBar__DonateBar__Icon: {
    height: '15px',
    width: '15px',
    marginRight: '5px'
  },
  'root__ToolBar__DonateBar__Icon--rtl': {
    marginLeft: theme.spacing.unit,
    marginRight: 0
  },
  'root_ToolBar__snackbar--rtl': {
    paddingLeft: '0',
    '& div:nth-child(2)': {
      paddingLeft: '0'
    }
  }
}));

class CoinsPage extends Component {
  constructor(props) {
    super();

    this.state = {
      displayedValuePairs: props.coinsData.valuePairs,
      searchQuery: '',
      snackbarOpen: false,
      snackbarMessage: ''
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

  donate(snackbarMessage) {
    this.setState({ snackbarMessage, snackbarOpen: true });
  }

  render() {
    const isRTL = this.props.locale.isRTL;
    const classes = this.props.classes;
    const donateClass = classnamesjss(this.props.classes, 'root__ToolBar__DonateBar', {
      'root__ToolBar__DonateBar--rtl': isRTL,
      'root__ToolBar__DonateBar--dark-theme': this.props.isDarkTheme
    });
    const logoClass = classnamesjss(this.props.classes, 'root__ToolBar__DonateBar__Icon', {
      'root__ToolBar__DonateBar__Icon--rtl': isRTL
    });
    const snackbarClass = classnamesjss(this.props.classes, {
      'root_ToolBar__snackbar--rtl': isRTL
    });

    return (
      <div className={classes.root}>
        <Toolbar className={this.props.classes.root_ToolBar}>
          <div className={this.props.classes.root__ToolBar__LeftPanel}>
            <SearchCoinsInput autoFocus={true} isRTL={isRTL} onChange={this._onSearchChange.bind(this)}/>
            <TargetCurrencyMenu />
            <Typography type="caption">{ T.translate('USD_EURO_AVAILABLE') }</Typography>
            <span onClick={ () => this.donate(T.translate('DONATE_TEXT', { address: config.DONATION.BITCOIN })) }>
              <Typography type="caption" className={donateClass}><img src={ BitcoinLogo } className={logoClass} />
                { T.translate('DONATE_BITCOIN') }
              </Typography>
            </span>
            <span onClick={ () => this.donate(T.translate('DONATE_TEXT', { address: config.DONATION.ETHEREUM })) }>
              <Typography type="caption" className={donateClass}><img src={ EthereumLogo } className={logoClass} />
                { T.translate('DONATE_ETHEREUM') }
              </Typography>
            </span>
            <span onClick={ () => this.donate(T.translate('DONATE_TEXT', { address: config.DONATION.LITECOIN })) }>
              <Typography type="caption" className={donateClass}>
                <img src={ LitecoinLogo } className={logoClass} />{ T.translate('DONATE_LITECOIN') }
              </Typography>
            </span>
          </div>
          <div className={this.props.classes.root__ToolBar__RightPanel}>
            {this._renderUpdateTime(this.props.coinsData.updateTimestamp)}
          </div>
        </Toolbar>
        <SimpleSnackbar
          className={ snackbarClass }
          message={ this.state.snackbarMessage }
          open={this.state.snackbarOpen}
          onClose={ () => this.setState({ snackbarOpen: false })} />
        <CoinsTable locale={this.props.locale}
          showLoading={this.props.showLoading}
          valuePairs={this.state.displayedValuePairs} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDarkTheme: state.site.isDarkTheme
});

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
  isDarkTheme: PropTypes.bool.isRequired,
  showLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(withStyles(styleSheet)(CoinsPage));
