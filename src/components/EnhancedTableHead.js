import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  TableSortLabel,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import {Checkbox} from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('EnhancedTableHead', (theme) => ({
  'root__TableHead__TableCell': {
    textAlign: 'center',
    fontSize: theme.typography.fontSize
  }
}));

class EnhancedTableHead extends Component {
  constructor() {
    super();

    this._createSortHandler.bind(this);
  }

  _createSortHandler(property) {
    return (event) => {
      this.props.onRequestSort && this.props.onRequestSort(event, property);
    };
  }

  _renderSelectAllClick(onSelectAllClick) {
    return onSelectAllClick ? (
      <TableCell checkbox>
        <Checkbox onChange={onSelectAllClick} />
      </TableCell>
    ) : null;
  }

  _renderHeaderColumns() {
    const { order, orderBy, columns, classes } = this.props;

    return columns.map((column) => {
      return (
        <TableCell key={column.id} className={classes.root__TableHead__TableCell}>
          <TableSortLabel active={orderBy === column.id} direction={order} onClick={this._createSortHandler(column.id)}>
            {column.label}
          </TableSortLabel>
        </TableCell>
      );
    });
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          {this._renderSelectAllClick(this.props.onSelectAllClick)}
          {this._renderHeaderColumns(this.props)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

export default withStyles(styleSheet)(EnhancedTableHead);
