import React from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from '../BuildHeaders/BuildHeaders.css';

const buildHeaders = (props) => (
  <div className={classes.BuildHeaders}>
    <BuildHeader 
        clicked={props.clicked}
        name={'crust'}>
      Crust, Cheese & Sauce
    </BuildHeader>
    
    <BuildHeader
        clicked={props.clicked}
        name={'toppings'}>
      Toppings
    </BuildHeader>
    {/* <BuildHeader style={{ 'color': 'yellow'}}>Veggies</BuildHeader> */}
  </div>
);

export default buildHeaders;