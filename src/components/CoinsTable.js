import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Immutable from 'seamless-immutable';
import Table, {
  TableCell,
  TableBody,
  TableRow
} from 'material-ui/Table';
import T from 'i18n-react';
import {Paper, Chip} from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red, green } from 'material-ui/styles/colors';
import classnamesjss from '../helpers/classnamesjss';
import InfoOutline from 'material-ui-icons/InfoOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';

import {SORT_DIRECTIONS, NO_VALUE_DATA_SYMBOL, COIN_STATUSES} from '../helpers/consts';
import EnhancedTableHead from './EnhancedTableHead';
import CircularIndeterminate from './CircularIndeterminate';

const numbersStrength = 500;
const styleSheet = createStyleSheet('CoinsTable', (theme) => ({
  root: {
    overflowX: 'auto'
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
    flexDirection: 'row-reverse'
  },
  root__TableBody__TableCell__displayedNameContainer__name: {
    flexGrow: 1
  },
  'root__TableBody__TableCell__displayedNameContainer__name--link': {
    transition: 'font-size 1s ease-in-out',
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
      fontSize: theme.typography.subheading.fontSize,
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
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: 0,
    backgroundColor: theme.palette.error[500]
  },
  'root__TableBody__TableCell__displayedNameContainer__Chip--rtl': {
    marginRight: theme.spacing.unit * 1.5,
    marginLeft: 0
  },
  'root__TableCell__percent-change-twenty-four-h': {
    direction: 'ltr',
    display: 'inline-block',
    color: green[numbersStrength]
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
  CHANGE: 'percentChange24h'
};

class CoinsTable extends Component {
  constructor() {
    super();

    this.state = {
      order: SORT_DIRECTIONS.DESC,
      orderBy: COLUMNS_IDS.MARKET_CAP,
      displayedValuePairs: []
    };

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

  _renderRows() {
    const {classes, locale, showRowHover} = this.props;

    return this.state.displayedValuePairs.map((pair) => {
      const percentChange24hClasses = classnamesjss(classes,
        'root__TableCell__percent-change-twenty-four-h',
        {'root__TableCell__percent-change-twenty-four-h--negative': pair.percentChange24h < 0}
      );

      const tableBodyCellClass = classnamesjss(classes,
        'root__TableBody__TableCell',
        {'root__TableBody__TableCell--rtl': locale.isRTL}
      );

      const nameContainerClass = classnamesjss(classes,
        'root__TableBody__TableCell__displayedNameContainer',
        {'root__TableBody__TableCell__displayedNameContainer--rtl': locale.isRTL}
      );

      const nameCellClass = classnamesjss(classes,
        'root__TableBody__TableCell__displayedNameContainer__name',
        {'root__TableBody__TableCell__displayedNameContainer__name--link': pair.baseCurrency.officialUrl}
      );

      const imgCellClass = classnamesjss(classes,
        'root__TableBody__TableCell__displayedNameContainer__img',
        {'root__TableBody__TableCell__displayedNameContainer__img--rtl': locale.isRTL}
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

      const inactiveChipCellClass = classnamesjss(classes,
        'root__TableBody__TableCell__displayedNameContainer__Chip',
        {'root__TableBody__TableCell__displayedNameContainer__Chip--rtl': locale.isRTL}
      );

      const inactiveStatusChip = pair.baseCurrency.status === COIN_STATUSES.INACTIVE ?
        <Chip label={COIN_STATUSES.INACTIVE} className={inactiveChipCellClass} /> :
        null;

      return (
        <TableRow hover={showRowHover} key={pair.rank}>
          <TableCell className={tableBodyCellClass}>{pair.rank}</TableCell>
          <TableCell className={tableBodyCellClass}>
            <div className={nameContainerClass}>
              {icon}
              {name}
              {inactiveStatusChip}
            </div>
          </TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayMarketCap}</TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayPrice}</TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayAvailableSupply}</TableCell>
          <TableCell className={tableBodyCellClass}>{pair.displayVolume24h}</TableCell>
          <TableCell className={tableBodyCellClass}>
            <span className={percentChange24hClasses}>{pair.displayPercentChange24h}</span>
          </TableCell>
        </TableRow>
      );
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
      {id: COLUMNS_IDS.MARKET_CAP, label: T.translate('TABLE_HEADER_MARKET_CAP')},
      {id: COLUMNS_IDS.PRICE, label: T.translate('TABLE_HEADER_PRICE')},
      {id: COLUMNS_IDS.AVAILABLE_SUPPLY, label: T.translate('TABLE_HEADER_AVAILABLE_SUPPLY')},
      {id: COLUMNS_IDS.VOLUME, label: T.translate('TABLE_HEADER_24H_VOLUME')},
      {id: COLUMNS_IDS.CHANGE, label: T.translate('TABLE_HEADER_24H_PERCENTAGE_CHANGE')}
    ];

    return (
      <Paper className={this.props.classes.root} elevation={12}>
        <Table>
          <EnhancedTableHead
            columns={headerColumns}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this._onRequestSort.bind(this)}
            locale={this.props.locale} />
          <TableBody>
            {!this.props.showLoading && this._renderRows()}
          </TableBody>
        </Table>
        {this.props.showLoading && <CircularIndeterminate />}
        {this._renderEmptyState()}
      </Paper>
    );
  }
}

CoinsTable.propTypes = {
  valuePairs: PropTypes.arrayOf(PropTypes.object),
  showRowHover: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  showLoading: PropTypes.bool.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  })
};

CoinsTable.defaultProps = {
  valuePairs: [],
  showRowHover: true
};

export default withStyles(styleSheet)(CoinsTable);
