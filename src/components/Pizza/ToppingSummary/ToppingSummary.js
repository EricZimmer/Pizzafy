import React from 'react';
import classes from './ToppingSummary.css';
import * as tTypes from '../../../ToppingTypes';
import Auxhoc from '../../../hoc/Auxhoc';


const ToppingSummary = (props) => {
  //console.log('ig = ',Object.keys(props.toppings.Meats).length)
  let toppings = props.toppings;
  let price = props.price;
  
  const getToppings = (toppingType) => {
    return Object.keys(toppingType).map(tName => {
      //console.log(toppingType[tName]['Extra'] ? toppingType[tName]['Extra'] : 'nope')
      let reg = toppingType[tName][tTypes.Regular] ? toppingType[tName][tTypes.Regular] : null;
      let ext = toppingType[tName][tTypes.Extra] ? toppingType[tName][tTypes.Extra] : null;
      let amp = reg && ext ? '&' : null;
        return (
          <p className={classes.Topping} key={tName}>
            {tName}: <span>{reg} {amp} {ext ? <strong>Extra: {ext}</strong> : null}</span>
          </p>
        );
    });
  };
  let meatToppings = null
  if (Object.keys(toppings.Meats).length >0) meatToppings = getToppings(toppings.Meats);
  
  const meatSum = meatToppings ? (<Auxhoc >
    <div className={classes.Heading}>Meats:</div>
    {meatToppings}
  </Auxhoc>) : 'No Toppings Selected';

  return (
    <div className={classes.Summary}>
      
        
        {meatSum}
        <p>Total: ${price.toFixed(2)}</p>
      
    </div>
  );
};

/* const mapStateToProps = state => {
  return {
    toppings: state.Toppings
  }
}; */

export default /* connect(mapStateToProps) */(ToppingSummary);