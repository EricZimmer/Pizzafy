import React from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from '../BuildHeaders/BuildHeaders.css';

const buildHeaders = (props) => (
  <div className={classes.BuildHeaders}>
    <BuildHeader 
        clicked={props.clicked}
        name={'BASE'}>
      CRUST, CHEESE & SAUCE
    </BuildHeader>
    
    <BuildHeader
        clicked={props.clicked}
        name={'TOPPINGS'}>
      TOPPINGS
    </BuildHeader>
    
    
  </div>
);

export default buildHeaders;