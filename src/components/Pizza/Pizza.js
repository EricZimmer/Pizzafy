import React from 'react';
import classes from './Pizza.css'
import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

const pizza = (props) => {
  /* let ingredients = null;
  if (props.ingredients != null) {
    let ingredientString = '';
    ingredients = Object.keys(props.ingredients)
      .map(ingr => {
        ingredientString = ingr.toLowerCase();
        return Object.keys(ingr).map((side, _) => {
          console.log(ingr.Left);
          return `${ingr} + '-' + ${ingr[side]} + '-' + ${ingr.side}`
        });
      });
      
  } */
  return (
    <div className={classes.Pizza}>
      <div className={classes.Pan}>
        <div className={classes.Crust}>
          <PizzaIngredient topping='Crust-regular'>
            <PizzaIngredient topping='topping-container'>
              <PizzaIngredient topping='cheese' />
              <PizzaIngredient topping='sauce' />
              {props.ingredients}
            </PizzaIngredient>
          </PizzaIngredient>
        </div>
        
      </div>
        
        
    </div>
  )
};

export default pizza;