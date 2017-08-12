import React from 'react';
import PropTypes from 'prop-types';

const percentFormatter = new Intl.NumberFormat(undefined, {style: 'percent'});
const euroFormatter = new Intl.NumberFormat(undefined, {style: 'currency', currency: 'EUR'});

export const Percent = ({value}) => (
  <span>{percentFormatter.format(value)}</span>
);

export const Euro = ({value}) => (
  <span>{euroFormatter.format(value)}</span>
);

Percent.propTypes = {
  value: PropTypes.number.isRequired
}

Euro.propTypes = {
  value: PropTypes.number.isRequired
}
