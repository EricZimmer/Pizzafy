import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import classes from './PizzaBuilder.css';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import BuildControls from '../../components/ControlGroup/BuildControls/BuildControls';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import IngredientSummary from '../../components/Pizza/IngredientSummary/IngredientSummary';

import * as IngrTypes from '../../INGREDIENTCONST';
import PizzaIngredient from '../../components/Pizza/PizzaIngredient/PizzaIngredient';

class PizzaBuilder extends Component {

  state = {
    currentTab: 'meat',
    /* ingredients: {
  
    } */
  };

  headerClickedHandler = (name) => {
    this.setState({currentTab: name})
  }

  addToppingHandler = (name, reg, extra) => {
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [IngrTypes[name]]: {
          /* ...this.state.ingredients[name], */
          /* ...newTopping, */
          [IngrTypes.REGULAR]: reg,
          [IngrTypes.EXTRA]: extra
        }
      }
    }
    this.setState({...newState});
  }

  clearToppingHander = (name) => {
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [IngrTypes[name]]: {
          /* ...this.state.ingredients[name], */
          [IngrTypes.REGULAR]: IngrTypes.NONE,
          [IngrTypes.EXTRA]: IngrTypes.NONE
        }
      }
    }
    this.setState({...newState});
  }

  render() {
    const stIngredients = this.state.ingredients !== null ? this.state.ingredients 
      : null;
    let pizzaIngredients = null;
    if (stIngredients != null) {
      

      pizzaIngredients = Object.keys(stIngredients)
        .map(ingr => {
          return Object.keys(stIngredients[ingr]).map((amount) => {
            let side = stIngredients[ingr][amount];
            return (
              <PizzaIngredient 
                  key={`${ingr} + '_' ${amount} + '_' ${side}`}
                  topping={ingr}
                  side={side}
                  amount={amount}/>
              );
          });
        });
    }
    console.log('pbi = ', stIngredients)
    return (
      <div className={classes.PizzaBuilder}>
        <Pizza 
          ingredients={pizzaIngredients}/>
        {/* <IngredientSummary ingredients={stIngredients}/> */}
        <BuildHeaders 
        clicked={ this.headerClickedHandler}/>
        <ControlGroup 
          addTopping={(name, side, amount) => this.addToppingHandler(name, side, amount) }
          clearTopping={name => this.clearToppingHander(name)}>
        </ControlGroup>
      </div>
    );
  }
}


export default PizzaBuilder;