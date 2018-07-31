import React from 'react';
import classes from './Pizza.css'
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

const pizza = (props) => {

  return (
    <div className={classes.Pizza}>
      <div className={classes.Pan}>
        <div className={classes.Crust}>
          <PizzaIngredient type='crust-regular'>
            <PizzaIngredient type='topping-container'>
              <PizzaIngredient type='cheese' />
              <PizzaIngredient type='sauce' />
              {/* <PizzaIngredient type='pepperoni-right' />
              <PizzaIngredient type='pepperoni-left' /> */}
              {/* <PizzaIngredient type='pepperoni-extra-left' />
              <PizzaIngredient type='pepperoni-extra-right' /> */}
              <PizzaIngredient type='sausage-left' />
              <PizzaIngredient type='sausage-right' />
              <PizzaIngredient type='sausage-extra-left' />
              <PizzaIngredient type='sausage-extra-right' />
            </PizzaIngredient>
          </PizzaIngredient>
        </div>
        
      </div>
        
        
    </div>
  )
};

export default pizza;