import React from 'react';
import classes from './Pizza.css'
import PizzaTopping from './PizzaTopping/PizzaTopping';

const pizza = (props) => {
  /* let Toppings = null;
  if (props.Toppings != null) {
    let ToppingString = '';
    Toppings = Object.keys(props.Toppings)
      .map(ingr => {
        ToppingString = ingr.toLowerCase();
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
          <PizzaTopping topping='Crust-regular'>
            <PizzaTopping topping='topping-container'>
              <PizzaTopping topping='cheese' />
              <PizzaTopping topping='sauce' />
              {props.Toppings}
            </PizzaTopping>
          </PizzaTopping>
        </div>
        
      </div>
        
        
    </div>
  )
};

export default pizza;