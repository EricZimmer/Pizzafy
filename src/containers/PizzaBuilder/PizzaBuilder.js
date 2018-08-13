import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
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
      
      [IngrTypes.PEPPERONI]: {
        [IngrTypes.REGULAR]: IngrTypes.NONE,
        [IngrTypes.EXTRA]: IngrTypes.NONE
      }
    }
  };

  headerClickedHandler = (name) => {
    
    /* console.log('clicked'); */
  }

  addToppingHandler = (name, side, amount) => {
     
    console.log('add top ', name, side, amount);
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [IngrTypes[name]]: {
          ...this.state.ingredients[name],
          /* ...newTopping, */
          [amount]: side
        }

      }
    }
    console.log(newState);
    this.setState({...newState});
    //console.log(this.state.ingredients[name[side]])
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
      <Auxhoc>
        <Pizza 
          ingredients={ingredients}/>
          
        <BuildHeaders 
          clicked={ this.headerClickedHandler}/>
        {/* <BuildControls 
            currentControl={this.state.currentTab}  
            clicked={(name) => this.headerClickedHandler(name)}
            addTopping={(event, name, side, amount, toggle) => this.addToppingHandler(event, name, side, amount, toggle)}>
        </BuildControls> */}
        <ControlGroup 
          addTopping={(name, side, amount) => this.addToppingHandler(name, side, amount) }/>
      </Auxhoc>
    );
  }
}


export default PizzaBuilder;