import React from 'react';
import classes from './Pizza.css'
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

const pizza = (props) => {

  return (
    <div className={classes.Pizza}>
      
      <PizzaIngredient type="crust-thin"/>
    </div>
  )
};

export default pizza;