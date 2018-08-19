import React from 'react';
import classes from './IngredientSummary.css';

const ingredientSummary = (props) => {
  console.log('ig = ',props.ingredients)
  const ingredients = props.ingredients !== undefined ? props.ingredients :
    'No Toppings Selected';
  return (
    <div className={classes.Summary}>
      
    </div>
  );
};

export default ingredientSummary;