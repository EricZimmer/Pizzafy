import React, { Component } from 'react';
import ToppingControls from './ToppingControls/ToppingControls';
import classes from './ControlGroup.css';
import * as tTypes from '../../ToppingTypes';



const ALL_Toppings = {
  Meats: [...tTypes.Toppings_Meats],
  Veggies: [...tTypes.Toppings_Veggies]
};

const controlGroup = (props) => {

  const setToppingControls = (MeatsOrVeg) => {
    return ALL_Toppings[MeatsOrVeg].map(topping => {
      return (
        <ToppingControls 
          key={topping}
          toppingName={topping}
          toppingType={props.toppingType}/>
      );
    });
  } 
  console.log('tTt', props.toppingType)
  return setToppingControls(props.toppingType);
  
}

export default controlGroup;