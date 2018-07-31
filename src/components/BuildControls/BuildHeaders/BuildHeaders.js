import React from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from './BuildHeaders.css';

const buildHeaders = (props) => (
  <ul className={classes.BuildHeaders}>
    <BuildHeader>Crust</BuildHeader>
    <BuildHeader>Meats</BuildHeader>
  </ul>
);

export default buildHeaders;