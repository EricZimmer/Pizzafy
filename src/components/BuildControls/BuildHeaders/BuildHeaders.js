import React from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from '../../BuildControls/BuildControls.css';

const buildHeaders = (props) => (
  <div className={classes.ControlGroup}>
    <BuildHeader style={{ 'color': 'yellow'}}>Crust, Cheese & Sauce</BuildHeader>
    
    <BuildHeader style={{ 'color': 'green'}}>Meats</BuildHeader>
    <BuildHeader style={{ 'color': 'yellow'}}>Veggies</BuildHeader>
  </div>
);

export default buildHeaders;