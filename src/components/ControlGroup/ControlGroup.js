import React, { Component } from 'react';
import BuildControls from './BuildControls/BuildControls';
import classes from './BuildControls/BuildControls.css';
import * as IngrTypes from '../../INGREDIENTCONST';

const TOPPINGS_MEAT = [IngrTypes.PEPPERONI, IngrTypes.SAUSAGE];

class ControlGroup extends Component {

  render() {
    let toppingsMeat = TOPPINGS_MEAT.map(topping => {
      return (
        <BuildControls 
          key={topping}
          /* id={topping} */
          topping={topping}/>
      );
    });
    return (
      <div 
        className={classes.BuildControlsContainer}
        /* onClick={(e) => this.toppingGroupToggle(e)} */>
        {toppingsMeat}
      </div>
    );
  }
}

export default ControlGroup;