import React from 'react';
import classes from './Pizza.css'
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

const pizza = (props) => {

  return (
    <div className={classes.Pizza}>
      <div className={classes.Pan}>
        <PizzaIngredient type='crust'>
          <PizzaIngredient type='crust-thin'>
            <PizzaIngredient type='topping-container'>
              <PizzaIngredient type='cheese' />
              <PizzaIngredient type='sauce' />
              <PizzaIngredient type='pepperoni' />
            </PizzaIngredient>
          </PizzaIngredient>
        </PizzaIngredient>
        
      </div>
        
        
    </div>
  )
};

export default pizza;