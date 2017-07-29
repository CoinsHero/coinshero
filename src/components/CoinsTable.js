import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import config from 'config';
import * as Immutable from 'seamless-immutable';
import Table, {
  TableCell,
  TableBody,
  TableRow
} from 'material-ui/Table';
import T from 'i18n-react';
import {Paper, Chip, Button} from 'material-ui';
import { withTheme, withStyles, createStyleSheet } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import classnamesjss from '../helpers/classnamesjss';
import InfoOutline from 'material-ui-icons/InfoOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import {debounce} from 'lodash';

import getRecursiveOffset from '../helpers/getRecursiveOffset';
import {SORT_DIRECTIONS, NO_VALUE_DATA_SYMBOL, COIN_STATUSES} from '../helpers/consts';
import EnhancedTableHead from './EnhancedTableHead';
import CircularIndeterminate from './CircularIndeterminate';

const numbersStrength = 500;
const styleSheet = createStyleSheet('CoinsTable', (theme) => ({
  root: {
    overflowX: 'auto'
  },
  root__loader: {
    margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`
  },
  'root__empty-state': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.error[400],
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  'root__empty-state__InfoIcon': {
    marginBottom: theme.spacing.unit / 2
  },
  root__TableBody__TableCell: {
    direction: 'ltr',
    textAlign: 'left'
  },
  'root__TableBody__TableCell--rtl': {
    direction: 'ltr',
    textAlign: 'right'
  },
  root__TableBody__TableCell__displayedNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  'root__TableBody__TableCell__displayedNameContainer--rtl': {
    direction: 'ltr',
    flexDirection: 'row-reverse'
  },
  root__TableBody__TableCell__displayedNameContainer__name: {
    flexGrow: 1
  },
  'root__TableBody__TableCell__displayedNameContainer__name--link': {
    transition: 'font-size 0.2s ease-in-out',
    willChange: 'font-size',
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
      fontSize: theme.typography.body2.fontSize,
      fontWeight: theme.typography.body2.fontWeight
    }
  },
  root__TableBody__TableCell__displayedNameContainer__img: {
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 1
  },
  'root__TableBody__TableCell__displayedNameContainer__img--rtl': {
    marginLeft: theme.spacing.unit * 1,
    marginRight: 0
  },
  root__TableBody__TableCell__displayedNameContainer__Chip: {
    marginLeft: theme.spacing.unit,
    marginRight: 0,
    backgroundColor: theme.palette.error[500]
  },
  'root__TableBody__TableCell__displayedNameContainer__Chip--rtl': {
    marginRight: theme.spacing.unit,
    marginLeft: 0
  },
  'root__TableCell__percent-change-twenty-four-h': {
    direction: 'ltr',
    display: 'inline-block',
    color: green[numbersStrength]
  },
  'root__TableCell__buy-container--rtl': {
    direction: 'rtl'
  },
  'root__TableCell__buy-container__buy-button': {
    color: grey[50]
  },
  'root__TableCell__percent-change-twenty-four-h--negative': {
    color: red[numbersStrength]
  }
}));

const COLUMNS_IDS = {
  RANK: 'rank',
  NAME: 'baseCurrency',
  MARKET_CAP: 'marketCap',
  PRICE: 'price',
  AVAILABLE_SUPPLY: 'availableSupply',
  VOLUME: 'volume24h',
  CHANGE: 'percentChange24h',
  BUY: 'buy'
};

class CoinsTable extends Component {
  constructor() {
    super();

    this.state = {
      order: SORT_DIRECTIONS.DESC,
      orderBy: COLUMNS_IDS.MARKET_CAP,
      displayedValuePairs: [],
      scrollTop: 0,
      paperOffset: {top: 0, left: 0}
    };

    this.listeners = [];
    const listenerScroll = window.addEventListener('scroll', debounce((event) => {
      this.setState({
        scrollTop: event.target.scrollingElement.scrollTop
      });
    }, 30));

    this.listeners.push({
      target: window,
      listener: listenerScroll,
      type: 'scroll'
    });

    this._onRequestSort.bind(this);
    this._getSortedTable.bind(this);
  }

  _renderEmptyState() {
    const showEmptyState = !this.props.showLoading && this.props.valuePairs.length === 0;
    return showEmptyState ?
      <div className={this.props.classes['root__empty-state']}>
        <InfoOutline className={this.props.classes['root__empty-state__InfoIcon']} />
        {T.translate('COINS_TABLE_EMPTY_STATE')}
      </div> :
      null;
  }

  _renderRows(startIndex, endIndex) {
    // TODO: Delete me
    console.log(`Start index: ${startIndex}, End index: ${endIndex}, scrollTop: ${this.state.scrollTop},
    rows: ${document.getElementsByTagName('tr').length - 1}`);

    const {classes, locale, showRowHover} = this.props;

    const tableBodyCellClass = classnamesjss(classes,
      'root__TableBody__TableCell',
      {'root__TableBody__TableCell--rtl': locale.isRTL}
    );

    const nameContainerClass = classnamesjss(classes,
      'root__TableBody__TableCell__displayedNameContainer',
      {'root__TableBody__TableCell__displayedNameContainer--rtl': locale.isRTL}
    );

    const imgCellClass = classnamesjss(classes,
      'root__TableBody__TableCell__displayedNameContainer__img',
      {'root__TableBody__TableCell__displayedNameContainer__img--rtl': locale.isRTL}
    );

    const inactiveChipCellClass = classnamesjss(classes,
      'root__TableBody__TableCell__displayedNameContainer__Chip',
      {'root__TableBody__TableCell__displayedNameContainer__Chip--rtl': locale.isRTL}
    );

    const buyContainer = classnamesjss(classes,
      {'root__TableCell__buy-container--rtl': locale.isRTL}
    );

    let index;
    let rows = [];

    for (index = startIndex; index < endIndex; index++) {
      const pair = this.props.valuePairs[index];

      const percentChange24hClasses = classnamesjss(classes,
        'root__TableCell__percent-change-twenty-four-h',
        {'root__TableCell__percent-change-twenty-four-h--negative': pair.percentChange24h < 0}
      );

      const nameCellClass = classnamesjss(classes,
        'root__TableBody__TableCell__displayedNameContainer__name',
        {'root__TableBody__TableCell__displayedNameContainer__name--link': pair.baseCurrency.officialUrl}
      );

      const icon = pair.baseCurrency.imageUrl ?
        <img className={imgCellClass}
          src={pair.baseCurrency.imageUrl}
          alt={pair.baseCurrency.symbol} /> :
        <MonetizationOn className={imgCellClass} />;

      const name = pair.baseCurrency.officialUrl ?
        <a href={pair.baseCurrency.officialUrl} rel="noopener noreferrer" target="_blank" className={nameCellClass}>
          {pair.baseCurrency.displayName}
        </a> :
        <span className={nameCellClass}>
          {pair.baseCurrency.displayName}
        </span>;

      rows.push(
        <TableRow hover={showRowHover} key={pair.rank}>
          <TableCell className={tableBodyCellClass}>{pair.rank}</TableCell>
          <TableCell className={tableBodyCellClass}>
            <div className={nameContainerClass}>
              {icon}
              {name}
            </div>
          </TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayPrice}</TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayMarketCap}</TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayAvailableSupply}</TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayVolume24h}</TableCell>
          <TableCell className={tableBodyCellClass}>
            <span className={percentChange24hClasses}>{pair.displayPercentChange24h}</span>
          </TableCell>
          <TableCell className={tableBodyCellClass}>
            <div className={buyContainer}>
              {
                pair.baseCurrency.status !== COIN_STATUSES.INACTIVE ?
                  <Button
                    raised
                    color="primary"
                    target="_blank"
                    className={classes['root__TableCell__buy-container__buy-button']}
                    href={`${config.ORIGINS.CHANGELLY}/exchange/USD/${pair.baseCurrency.code}/1?ref_id=${config.SERVICES.CHANGELLY.REF_ID}`}>
                    { T.translate('TABLE_BUY_BUTTON')}
                  </Button> :
                  <Chip label={COIN_STATUSES.INACTIVE} className={inactiveChipCellClass} />
              }
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return rows;
  }

  componentWillUnmount() {
    let currentListener;

    for (let index = 0; index < this.listeners.length; index++) {
      currentListener = this.listeners[index];
      currentListener.target.removeEventListener(currentListener.type, currentListener.listener);
    }
  }

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      paperOffset: this.paperNode ? getRecursiveOffset(ReactDOM.findDOMNode(this.paperNode)) : {top: 0, left: 0}
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    let order = this.state.order;
    let orderBy = this.state.orderBy;
    const displayedValuePairs = this._getSortedTable(order, orderBy, nextProps.valuePairs);

    this.setState({order, orderBy, displayedValuePairs});
  }

  _getSortedTable(order, orderBy, values) {
    return Immutable.from([].concat(values).sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];
      const EMPTY_VALUE = -999;

      if (bValue === NO_VALUE_DATA_SYMBOL) {
        bValue = EMPTY_VALUE;
      }

      if (aValue === NO_VALUE_DATA_SYMBOL) {
        aValue = EMPTY_VALUE;
      }

      if (orderBy === COLUMNS_IDS.NAME) {
        const NAME_FIELD = 'displayName';
        aValue = aValue[NAME_FIELD].toLowerCase();
        bValue = bValue[NAME_FIELD].toLowerCase();
      }

      const multipleFactor = order === SORT_DIRECTIONS.DESC ? 1 : -1;

      if (bValue > aValue) {
        return multipleFactor;
      } else if (aValue > bValue) {
        return multipleFactor * -1;
      }

      return 0;
    }));
  }

  _onRequestSort(event, columnId) {
    let order = this.state.order;
    let orderBy = this.state.orderBy;

    if (columnId === this.state.orderBy) {
      order = (order === SORT_DIRECTIONS.ASC) ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC;
    } else {
      order = SORT_DIRECTIONS.DESC;
      orderBy = columnId;
    }

    const displayedValuePairs = this._getSortedTable(order, orderBy, this.state.displayedValuePairs);

    this.setState({order, orderBy, displayedValuePairs});
  }

  render() {
    // TODO: Add TABLE_HEADER_RANK_TOOLTIP & TABLE_HEADER_AVAILABLE_SUPPLY_TOOLTIP once https://github.com/callemall/material-ui/issues/2230
    const headerColumns = [
      {id: COLUMNS_IDS.RANK, label: T.translate('TABLE_HEADER_RANK')},
      {id: COLUMNS_IDS.NAME, label: T.translate('TABLE_HEADER_NAME')},
      {id: COLUMNS_IDS.PRICE, label: T.translate('TABLE_HEADER_PRICE')},
      {id: COLUMNS_IDS.MARKET_CAP, label: T.translate('TABLE_HEADER_MARKET_CAP')},
      {id: COLUMNS_IDS.AVAILABLE_SUPPLY, label: T.translate('TABLE_HEADER_AVAILABLE_SUPPLY')},
      {id: COLUMNS_IDS.VOLUME, label: T.translate('TABLE_HEADER_24H_VOLUME')},
      {id: COLUMNS_IDS.CHANGE, label: T.translate('TABLE_HEADER_24H_PERCENTAGE_CHANGE')},
      {id: COLUMNS_IDS.BUY, label: ''}
    ];

    let paperVirtualScrollStyle;
    let startIndex = 0;
    let endIndex = 0;
    const numRows = this.props.valuePairs.length;

    if (!this.props.showLoading && numRows > 0) {
      const rowHeight = this.props.rowHeight;

      // +1.4 for the header row which is bigger
      const totalHeight = (numRows + 1.4) * rowHeight;
      const scrollTopInsideTable = Math.max(0, this.state.scrollTop - this.state.paperOffset.top);

      const scrollBottom = scrollTopInsideTable + window.innerHeight;

      startIndex = Math.max(0, Math.floor(scrollTopInsideTable / rowHeight) - this.props.scrollOffset);
      endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + this.props.scrollOffset);

      const paddingTop = startIndex * rowHeight;
      paperVirtualScrollStyle = { paddingTop, pointerEvents: 'none', height: totalHeight - paddingTop, maxHeight: totalHeight };
    }

    return (
      <Paper ref={(node) => this.paperNode = node} style={paperVirtualScrollStyle} className={this.props.classes.root} elevation={12}>
        <Table>
          <EnhancedTableHead
            columns={headerColumns}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this._onRequestSort.bind(this)}
            locale={this.props.locale} />
          <TableBody>
            {!this.props.showLoading && this._renderRows(startIndex, endIndex)}
          </TableBody>
        </Table>
        {this.props.showLoading && <div className={this.props.classes.root__loader}><CircularIndeterminate /></div>}
        {this._renderEmptyState()}
      </Paper>
    );
  }
}

CoinsTable.propTypes = {
  valuePairs: PropTypes.arrayOf(PropTypes.object),
  showRowHover: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  showLoading: PropTypes.bool.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  rowHeight: PropTypes.number,
  scrollOffset: PropTypes.number
};

CoinsTable.defaultProps = {
  valuePairs: [],
  showRowHover: true,
  scrollOffset: 40,
  rowHeight: 48
};

export default withTheme(withStyles(styleSheet)(CoinsTable));
