import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './PizzaIngredient.css';

class PizzaIngredient extends Component {
  render () {
    let ingredients = null;
    switch (this.props.type) {
      
      case('crust-thin'):
        ingredients = <div className={classes.CrustThin}></div>;
        break;
      default: ingredients = null;
    }
    return (
      <div className={classes.Crust}>
        {ingredients}
      </div>
    );
  }
}

PizzaIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default PizzaIngredient;