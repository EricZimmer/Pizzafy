import React from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from '../BuildHeaders/BuildHeaders.css';

const buildHeaders = (props) => (
  <div className={classes.BuildHeaders}>
    <BuildHeader style={{ 'color': 'yellow'}}>Crust, Cheese & Sauce</BuildHeader>
    
    <BuildHeader style={{ 'color': 'green'}}>Toppings</BuildHeader>
    {/* <BuildHeader style={{ 'color': 'yellow'}}>Veggies</BuildHeader> */}
  </div>
);

export default buildHeaders;