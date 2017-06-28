import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table, {
  // TableHead,
  TableCell,
  TableBody,
  TableRow
} from 'material-ui/Table';
import T from 'i18n-react';
import {Paper, Typography} from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red, green } from 'material-ui/styles/colors';
import classnamesjss from '../helpers/classnamesjss';
import InfoOutline from 'material-ui-icons/InfoOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';

import {SORT_DIRECTIONS} from '../helpers/consts';
import EnhancedTableHead from './EnhancedTableHead';
import CircularIndeterminate from './CircularIndeterminate';

const numbersStrength = 500;
const styleSheet = createStyleSheet('CoinsTable', (theme) => ({
  'root': {
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
  'root__TableHead__TableCell': {
    textAlign: 'center'
  },
  'root__TableBody__TableCell': {
    direction: 'ltr',
    textAlign: 'center'
  },
  'root__TableBody__TableCell__displayedNameContainer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'root__TableBody__TableCell__displayedNameContainer--rtl': {
    flexDirection: 'row-reverse'
  },
  'root__TableBody__TableCell__displayedNameContainer__name': {
    flexGrow: 1
  },
  'root__TableBody__TableCell__displayedNameContainer__img': {
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3
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

export const COLUMNS_IDS = {
  RANK: 'rank',
  NAME: 'name',
  MARKET_CAP: 'mkcap',
  PRICE: 'price',
  AVAILABLE_SUPPLY: 'supply',
  VOLUME: 'volume',
  CHANGE: 'change'
};

class CoinsTable extends Component {
  _renderEmptyState() {
    const showEmptyState = !this.props.showLoading && this.props.valuePairs.length === 0;
    return showEmptyState ?
      <div className={this.props.classes['root__empty-state']}>
        <InfoOutline className={this.props.classes['root__empty-state__InfoIcon']} />
        {T.translate('COINS_TABLE_EMPTY_STATE')}
      </div> :
      null;
  }

  _renderRows(props) {
    return props.valuePairs.map((pair) => {
      const percentChange24hClasses = classnamesjss(props.classes,
        'root__TableCell__percent-change-twenty-four-h',
        {'root__TableCell__percent-change-twenty-four-h--negative': pair.percentChange24h < 0}
      );

      const tableBodyCellClass = props.classes.root__TableBody__TableCell;

      const nameContainerClass = classnamesjss(props.classes,
        'root__TableBody__TableCell__displayedNameContainer',
        {'root__TableBody__TableCell__displayedNameContainer--rtl': props.locale.isRTL}
      );

      const nameCellClass = classnamesjss(props.classes,
        'root__TableBody__TableCell__displayedNameContainer__name',
      );

      const icon = pair.baseCurrency.imageUrl ?
        <img className={props.classes.root__TableBody__TableCell__displayedNameContainer__img}
          src={pair.baseCurrency.imageUrl}
          alt={pair.baseCurrency.symbol} /> :
        <MonetizationOn />;

      return (
        <TableRow hover={props.showRowHover} key={pair.rank}>
          <TableCell className={tableBodyCellClass}>{pair.rank}</TableCell>
          <TableCell className={tableBodyCellClass}>
            <div className={nameContainerClass}>
              {icon}
              <span className={nameCellClass}>
                {pair.baseCurrency.displayName}
              </span>
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

  _renderHeaderColumns(columns) {
    const tableHeaderCellClass = this.props.classes['root__TableHead__TableCell'];
    return columns.map((column) => {
      return (
        <TableCell key={column.label} className={tableHeaderCellClass}>
          <Typography>
            {column.label}
          </Typography>
        </TableCell>
      );
    });
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

    const {classes, sortOptions, showLoading} = this.props;
    const {onRequestSort, order, orderBy} = sortOptions;

    // <TableHead>
    //   <TableRow>
    //     {this._renderHeaderColumns(headerColumns)}
    //   </TableRow>
    // </TableHead>

    return (
      <Paper className={classes.root} elevation={12}>
        <Table>

          <EnhancedTableHead
            columns={headerColumns}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort} />
          <TableBody>
            {!showLoading && this._renderRows(this.props)}
          </TableBody>
        </Table>
        {showLoading && <CircularIndeterminate />}
        {this._renderEmptyState()}
      </Paper>
    );
  }
}

CoinsTable.propTypes = {
  sortOptions: PropTypes.shape({
    onRequestSort: PropTypes.func,
    order: PropTypes.oneOf([
      SORT_DIRECTIONS.ASC,
      SORT_DIRECTIONS.DESC
    ]),
    orderBy: PropTypes.oneOf(Object.values(COLUMNS_IDS))
  }),
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
  showRowHover: true,
  sortOptions: {}
};

export default withStyles(styleSheet)(CoinsTable);
