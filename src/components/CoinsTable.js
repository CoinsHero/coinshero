import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table, {
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from 'material-ui/Table';
import T from 'i18n-react';
import Paper from 'material-ui/Paper';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { red, green } from 'material-ui/styles/colors';
import classnamesjss from '../helpers/classnamesjss';
import InfoOutline from 'material-ui-icons/InfoOutline';
import MonetizationOn from 'material-ui-icons/MonetizationOn';

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
  'root__TableCell__percent-change-twenty-four-h': {
    direction: 'ltr',
    display: 'inline-block',
    color: green[numbersStrength]
  },
  'root__TableCell__percent-change-twenty-four-h--negative': {
    color: red[numbersStrength]
  }
}));

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

      const icon = pair.iconUrl && <img src={pair.iconUrl} /> || <MonetizationOn />;

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

  render() {
    const tableHeaderCellClass = this.props.classes['root__TableHead__TableCell'];

    // TODO: Add TABLE_HEADER_RANK_TOOLTIP & TABLE_HEADER_AVAILABLE_SUPPLY_TOOLTIP once https://github.com/callemall/material-ui/issues/2230
    return (
      <Paper className={this.props.classes.root} elevation={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={tableHeaderCellClass}>#</TableCell>
              <TableCell className={tableHeaderCellClass}>{T.translate('TABLE_HEADER_NAME')}</TableCell>
              <TableCell className={tableHeaderCellClass}>{T.translate('TABLE_HEADER_MARKET_CAP')}</TableCell>
              <TableCell className={tableHeaderCellClass}>{T.translate('TABLE_HEADER_PRICE')}</TableCell>
              <TableCell className={tableHeaderCellClass}>{T.translate('TABLE_HEADER_AVAILABLE_SUPPLY')}</TableCell>
              <TableCell className={tableHeaderCellClass}>{T.translate('TABLE_HEADER_24H_VOLUME')}</TableCell>
              <TableCell className={tableHeaderCellClass}>{T.translate('TABLE_HEADER_24H_PERCENTAGE_CHANGE')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!this.props.showLoading && this._renderRows(this.props)}
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
