import React from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from '../BuildHeaders/BuildHeaders.css';

const buildHeaders = (props) => (
  <div className={classes.BuildHeaders}>
    <BuildHeader 
        clicked={props.clicked}
        name={'BASE'}>
      CRUST
    </BuildHeader>
    
    <BuildHeader
        clicked={props.clicked}
        name={'MEAT'}>
      MEAT
    </BuildHeader>
    <BuildHeader
        clicked={props.clicked}
        name={'VEGGIES'}>
      VEGGIES
    </BuildHeader>
    
  </div>
);

export default buildHeaders;