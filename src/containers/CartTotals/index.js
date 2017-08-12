import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import './index.css';

const CartTotals = (props) => {
  const { products, meta } = props;
  // for each product in cart, multiply quantity by price, calculate totals
  let gross = 0;
  let totalTax = 0;

  _.forEach(products, (product, id) => {
    const { tax, price} = product;
    const { quantity } = meta[id];
    const priceMultQuantity = price * quantity;
    gross += priceMultQuantity;
    totalTax += priceMultQuantity * tax;
  });

  const nett = gross + totalTax;
  // TODO: format numbers with currency formatter, place Currency and Percent components in one file

  return (
    <div className="lists-container">
      <List style={{flexGrow: 0.6}}>
        <ListItem disabled primaryText="Gross" />
        <Divider />
        <ListItem disabled primaryText="Total tax" />
        <Divider />
        <ListItem disabled primaryText="To pay (nett)" />
      </List>
      <List style={{flexGrow: 0.4}}>
        <ListItem disabled primaryText={gross.toString()} />
        <Divider />
        <ListItem disabled primaryText={totalTax.toString()} />
        <Divider />
        <ListItem disabled primaryText={nett.toString()} />
      </List>
    </div>
  );
}

CartTotals.propTypes = {
  products: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    meta: state.cart.meta
  }
}

export default connect(mapStateToProps)(CartTotals);
