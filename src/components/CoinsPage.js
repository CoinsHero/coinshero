import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Toolbar, Typography } from 'material-ui';
import T from 'i18n-react';
import ClipboardButton from 'react-clipboard.js';

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
    background: `linear-gradient(to bottom, ${theme.palette.accent.gray} 0%, ${theme.palette.accent.lightgray} 100%)`,
    padding: '2px 4px',
    borderRight: `1px solid ${theme.palette.accent['A400']}`,
    borderBottom: `1px solid ${theme.palette.accent['A400']}`,
    boxShadow: '1px 1px 4px rgba(0,0,0,0.075), inset 1px 1px 0px rgba(255,255,255,0.8)',
    borderRadius: '2px 2px 2px 2px',
    cursor: 'pointer',
    '&:hover': {
      background: `linear-gradient(to bottom, ${theme.palette.accent.lightgray} 0%, ${theme.palette.accent.gray} 100%)`
    }
  },
  'root__ToolBar__DonateBar--dark-theme': {
    background: `linear-gradient(to bottom, ${theme.palette.accent['A300']} 0%, #0a0a0a 100%)`,
    '&:hover': {
      background: `linear-gradient(to bottom, #0a0a0a 0%, ${theme.palette.accent['A300']} 100%)`
    }
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
  'root__ToolBar__snackbar--rtl': {
    paddingLeft: '0',
    '& div:nth-child(2)': {
      paddingLeft: '0'
    }
  },
  'root__ToolBar__hidden-copy-button': {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    marginLeft: theme.spacing.unit
  },
  'root__ToolBar__hidden-copy-button--rtl': {
    marginLeft: 0,
    marginRight: theme.spacing.unit
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
      'root__ToolBar__DonateBar--dark-theme': this.props.isDarkTheme
    });
    const logoClass = classnamesjss(this.props.classes, 'root__ToolBar__DonateBar__Icon', {
      'root__ToolBar__DonateBar__Icon--rtl': isRTL
    });
    const snackbarClass = classnamesjss(this.props.classes, {
      'root__ToolBar__snackbar--rtl': isRTL
    });
    const copyButton = classnamesjss(this.props.classes, 'root__ToolBar__hidden-copy-button', {
      'root__ToolBar__hidden-copy-button--rtl': isRTL
    });

    return (
      <div className={classes.root}>
        <Toolbar className={this.props.classes.root_ToolBar}>
          <div className={this.props.classes.root__ToolBar__LeftPanel}>
            <SearchCoinsInput autoFocus={true} isRTL={isRTL} onChange={this._onSearchChange.bind(this)}/>
            <TargetCurrencyMenu />
            <Typography type="caption">{ T.translate('USD_EURO_AVAILABLE') }</Typography>
            <ClipboardButton className={ copyButton } data-clipboard-text={ config.DONATION.BITCOIN }
              onClick={ () => this.donate(T.translate('DONATE_TEXT', { address: config.DONATION.BITCOIN, coin: 'Bitcoin' })) }>
              <Typography type="caption" className={donateClass}><img src={ BitcoinLogo } className={logoClass} />
                { T.translate('DONATE_BITCOIN') }
              </Typography>
            </ClipboardButton>
            <ClipboardButton className={ copyButton } data-clipboard-text={ config.DONATION.ETHEREUM }
              onClick={ () => this.donate(T.translate('DONATE_TEXT', { address: config.DONATION.ETHEREUM, coin: 'Ethereum' })) }>
              <Typography type="caption" className={donateClass}><img src={ EthereumLogo } className={logoClass} />
                <input id="ethereum_address" hidden readOnly value={ config.DONATION.ETHEREUM } />
                { T.translate('DONATE_ETHEREUM') }
              </Typography>
            </ClipboardButton>
            <ClipboardButton className={ copyButton } data-clipboard-text={ config.DONATION.LITECOIN }
              onClick={ () => this.donate(T.translate('DONATE_TEXT', { address: config.DONATION.LITECOIN, coin: 'Litecoin' })) }>
              <Typography type="caption" className={donateClass}>
                <input id="litecoin_address" hidden readOnly value={ config.DONATION.LITECOIN } />
                <img src={ LitecoinLogo } className={logoClass} />{ T.translate('DONATE_LITECOIN') }
              </Typography>
            </ClipboardButton>
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
