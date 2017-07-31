import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Toolbar, Typography, Button } from 'material-ui';
import T from 'i18n-react';
import CopyToClipboard from 'react-copy-to-clipboard';

import config from 'config';
import classnamesjss from '../helpers/classnamesjss';

import BitcoinLogo from '../assets/images/bitcoin_logo.png';
import LitecoinLogo from '../assets/images/litecoin_logo.png';
import EthereumLogo from '../assets/images/ethereum_logo.png';
import SimpleSnackbar from './SimpleSnackbar';
import CoinsTable from './CoinsTable';
import SearchCoinsInput from './SearchCoinsInput';
import TargetCurrencyMenu from './TargetCurrencyMenu';

const styleSheet = createStyleSheet((theme) => ({
  root: {
    width: '95%',
    marginBottom: theme.spacing.unit * 3
  },
  root__ToolBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 0,
    marginBottom: `${theme.spacing.unit * 1.25}px`
  },
  'root__ToolBar--xs': {
    flexDirection: 'column',
    height: theme.spacing.unit * 10
  },
  root__ToolBar__LeftPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: theme.spacing.unit / 2
  },
  'root__ToolBar__LeftPanel--xs': {
    width: '100%'
  },
  root__ToolBar__RightPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  'root__ToolBar__RightPanel--xs': {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '5px',
    alignItems: 'center'
  },
  'root__ToolBar__RightPanel__update-time-hidden': {
    transition: 'opacity 2s ease-in-out',
    opacity: 0
  },
  'root__ToolBar__RightPanel__update-time-visible': {
    opacity: 1
  },
  'root__ToolBar__RightPanel__update-time-visible--xs': {
    fontSize: theme.typography.caption.fontSize
  },
  root__DonationsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  root__ToolBar__DonateBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit * 1.25}px ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px`,
    cursor: 'pointer'
  },
  'root__ToolBar__DonateBar--rtl': {
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px ${theme.spacing.unit * 1.25}px`
  },
  'root__ToolBar__DonateBar--dark-theme': {
    background: `linear-gradient(to bottom, ${theme.palette.accent['A300']} 0%, #0a0a0a 100%)`,
    '&:hover': {
      background: `linear-gradient(to bottom, #0a0a0a 0%, ${theme.palette.accent['A300']} 100%)`
    }
  },
  root__ToolBar__DonateBar__Icon: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
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
  'root__ToolBar__purchases-caption': {
  },
  root__ToolBar__CopyButton: {
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  'root__ToolBar__CopyButton--rtl': {
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
      `root__ToolBar__RightPanel__update-time-visible--${this.props.windowSize}`,
      {'root__ToolBar__RightPanel__update-time-visible': updateTimestamp}
    );

    let date = new Date(updateTimestamp);
    date = this.props.windowSize === 'xs'
      ? date.toLocaleTimeString(this.props.locale.code)
      : date.toLocaleString(this.props.locale.code);
    return (
      <Typography className={cx}>
        {T.translate('LAST_UPDATE_TIME', {time: date})}
      </Typography>
    );
  }

  donate(snackbarMessage) {
    this.setState({ snackbarMessage, snackbarOpen: true });
  }

  renderDonations() {
    const isRTL = this.props.locale.isRTL;
    const donateClass = classnamesjss(this.props.classes, 'root__ToolBar__DonateBar', {
      'root__ToolBar__DonateBar--rtl': isRTL
    });
    const logoClass = classnamesjss(this.props.classes, 'root__ToolBar__DonateBar__Icon', {
      'root__ToolBar__DonateBar__Icon--rtl': isRTL
    });
    const copyButton = classnamesjss(this.props.classes, 'root__ToolBar__CopyButton', {
      'root__ToolBar__CopyButton--rtl': isRTL
    });
    const donationsBar = classnamesjss(this.props.classes, 'root__DonationsBar');

    const donations = [
      {
        donateSnackBarText: T.translate('DONATE_TEXT', { address: config.DONATION.BITCOIN, coin: 'Bitcoin' }),
        copyValue: config.DONATION.BITCOIN,
        buttonText: T.translate('DONATE_BITCOIN'),
        ariaText: 'donate-bitcoin',
        srcURL: BitcoinLogo
      },
      {
        donateSnackBarText: T.translate('DONATE_TEXT', { address: config.DONATION.ETHEREUM, coin: 'Ethereum' }),
        copyValue: config.DONATION.ETHEREUM,
        buttonText: T.translate('DONATE_ETHEREUM'),
        ariaText: 'donate-ethereum',
        srcURL: EthereumLogo
      },
      {
        donateSnackBarText: T.translate('DONATE_TEXT', { address: config.DONATION.LITECOIN, coin: 'Litecoin' }),
        copyValue: config.DONATION.LITECOIN,
        buttonText: T.translate('DONATE_LITECOIN'),
        ariaText: 'donate-litecoin',
        srcURL: LitecoinLogo
      }
    ];

    return (
      <div className={donationsBar}>
        {
          donations.map((donation, index) => {
            return (
              <CopyToClipboard key={index} text={donation.copyValue} className={ copyButton }
                onCopy={() => this.donate(donation.donateSnackBarText)}>
                <Button
                  raised
                  color="primary"
                  className={donateClass}
                  aria-owns={donation.ariaText}
                  aria-haspopup="true">
                  <img src={ donation.srcURL } className={logoClass} />
                  { donation.buttonText }
                </Button>
              </CopyToClipboard>
            );
          })
        }
      </div>
    );
  }

  render() {
    const isRTL = this.props.locale.isRTL;
    const classes = this.props.classes;
    const usdEUClass = classnamesjss(classes, {
      'root__ToolBar__purchases-caption': !isRTL,
      'root__ToolBar__purchases-caption--rtl': isRTL
    });
    const snackbarClass = classnamesjss(classes, {
      'root__ToolBar__snackbar--rtl': isRTL
    });

    const toolbarClasses = `${this.props.classes.root__ToolBar} ${this.props.classes['root__ToolBar' + '--' + this.props.windowSize]}`;
    const leftPanelClasses = classnamesjss(classes, 'root__ToolBar__LeftPanel', `root__ToolBar__LeftPanel--${this.props.windowSize}`);
    const rightPanelClasses = classnamesjss(classes, 'root__ToolBar__RightPanel', `root__ToolBar__RightPanel--${this.props.windowSize}`);

    return (
      <div className={classes.root}>
        { this.renderDonations() }
        <Toolbar classes={{ root: toolbarClasses }}>
          <div className={leftPanelClasses}>
            <SearchCoinsInput autoFocus={true} isRTL={isRTL} onChange={this._onSearchChange.bind(this)}/>
            <TargetCurrencyMenu />
          </div>
          <div className={rightPanelClasses}>
            <Typography type="caption" className={ usdEUClass }>{ T.translate('USD_EURO_AVAILABLE') }</Typography>
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
  isDarkTheme: state.site.isDarkTheme,
  windowSize: state.site.windowSize
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
  windowSize: PropTypes.string.isRequired,
  showLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(withStyles(styleSheet)(CoinsPage));
