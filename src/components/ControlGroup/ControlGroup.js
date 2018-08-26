import React, { Component } from 'react';
import BuildControls from './BuildControls/BuildControls';
import classes from './ControlGroup.css';
import * as ToppingTypes from '../../ToppingTypes';

const Toppings_Meats = [ToppingTypes.Pepperoni, ToppingTypes.Sausage, ToppingTypes.Ham];
const Toppings_Veggies = ['Peppers', 'Tomatoes', 'MUSHROOMS'];

const ALL_Toppings = {
  Meats: [
    ToppingTypes.Pepperoni, ToppingTypes.Sausage, ToppingTypes.Ham
  ],
  Veggies: [
    'Peppers', 'Tomatoes', 'MUSHROOMS'
  ]
};

const controlGroup = (props) => {

  const setToppingControls = (MeatsOrVeg) => {
    return ALL_Toppings[MeatsOrVeg].map(topping => {
      return (
        <BuildControls 
          key={topping}
          toppingName={topping}
          toppingType={props.toppingType}
          addTopping={props.addTopping}
          removeTopping={props.removeTopping} />
      );
    });
  } 

  
  let toppings = setToppingControls('Meats');
  return (
    <div className={classes.BuildControlsContainer}>
      {toppings}
    </div>
  );
  
}

export default controlGroup;