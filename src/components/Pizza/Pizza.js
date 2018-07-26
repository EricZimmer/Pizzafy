import React from 'react';
import classes from './Pizza.css'
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

const pizza = (props) => {

  return (
    <div className={classes.Pizza}>
      <div className={classes.Pan}>
        <PizzaIngredient type='crust'>
          <PizzaIngredient type='crust-regular'>
            <PizzaIngredient type='topping-container'>
              <PizzaIngredient type='cheese' />
              <PizzaIngredient type='sauce' />
              <PizzaIngredient type='pepperoni-right' />
              <PizzaIngredient type='pepperoni-left' />
              {/* <PizzaIngredient type='pepperoni-extra' /> */}
            </PizzaIngredient>
          </PizzaIngredient>
        </PizzaIngredient>
        
      </div>
        
        
    </div>
  )
};

export default pizza;