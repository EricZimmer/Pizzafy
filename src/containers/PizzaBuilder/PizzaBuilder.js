import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import classes from './PizzaBuilder.css';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import BuildControls from '../../components/ControlGroup/BuildControls/BuildControls';
import ControlGroup from '../../components/ControlGroup/ControlGroup';

import * as IngrTypes from '../../INGREDIENTCONST';
import PizzaIngredient from '../../components/Pizza/PizzaIngredient/PizzaIngredient';

class PizzaBuilder extends Component {

  state = {
    currentTab: 'meat',
    ingredients: {
      
      /* [IngrTypes.PEPPERONI]: {
        [IngrTypes.REGULAR]: IngrTypes.NONE,
        [IngrTypes.EXTRA]: IngrTypes.NONE
      } */
    }
  };

  headerClickedHandler = (name) => {
    
    /* console.log('clicked'); */
  }

  addToppingHandler = (name, reg, extra) => {
     
    /* console.log('add top ', name, side, amount); */
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [IngrTypes[name]]: {
          ...this.state.ingredients[name],
          /* ...newTopping, */
          [IngrTypes.REGULAR]: reg,
          [IngrTypes.EXTRA]: extra
        }

      }
    }
    console.log(newState);
    this.setState({...newState});
    //console.log(this.state.ingredients[name[side]])
  }

  clearToppingHander = (name) => {
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [IngrTypes[name]]: {
          ...this.state.ingredients[name],
          /* ...newTopping, */
          [IngrTypes.REGULAR]: IngrTypes.NONE,
          [IngrTypes.EXTRA]: IngrTypes.NONE
        }

      }
    }
    this.setState({...newState});
  }

  render() {
    /* let ingredient = (
        <PizzaIngredient 
        topping={'PEPPERONI'}
        side={'LEFT'}
        amount={'REGULAR'}/>
    ); */
    let ingredients = null;
    if (this.state.ingredients != null) {
      let stIngr = {...this.state.ingredients};

      ingredients = Object.keys(stIngr)
        .map(ingr => {
          return Object.keys(stIngr[ingr]).map((amount) => {
            let side = stIngr[ingr][amount];
            return (
              <PizzaIngredient 
                  key={`${ingr} + '_' ${amount} + '_' ${side}`}
                  topping={ingr}
                  side={side}
                  amount={amount}/>
              );
            /* `${ingr} + '-' + ${side} + '-' + ${stIngr[ingr][side]}` */
          });
        });
        /* console.log('ingredients = ', stIngr); */
    }
    return (
      <div className={classes.PizzaBuilder}>
        <Pizza 
          ingredients={ingredients}/>
          
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