import React, { Component } from 'react';
import ToppingControls from './ToppingControls/ToppingControls';
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
        <ToppingControls 
          key={topping}
          toppingName={topping}
          toppingType={props.toppingType}/>
      );
    });
  } 

  
  let toppings = setToppingControls('Meats');
  return (
    <div className={classes.MainControlsContainer}>
      {toppings}
    </div>
  );
  
}

export default controlGroup;