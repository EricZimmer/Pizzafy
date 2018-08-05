import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import BuildControls from '../../components/BuildControls/BuildControls';

import * as IngrTypes from '../../INGREDIENTCONST';
import PizzaIngredient from '../../components/Pizza/PizzaIngredient/PizzaIngredient';

class PizzaBuilder extends Component {

  state = {
    currentTab: 'meat',
    ingredients: {
      PEPPERONI: {
        LEFT: IngrTypes.NONE,
        RIGHT: IngrTypes.NONE,
        [IngrTypes.WHOLE]: IngrTypes.NONE
      },
      SAUSAGE: {
        [IngrTypes.LEFT]: IngrTypes.REGULAR,
        [IngrTypes.RIGHT]: IngrTypes.REGULAR,
        [IngrTypes.WHOLE]: IngrTypes.REGULAR
      }
    }
  };

  headerClickedHandler = (name) => {
    
    /* console.log('clicked'); */
  }

  addToppingHandler = (event, name, side, amount) => {
    console.log(name, side, amount);
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      ...this.state.ingredients,
      ingredients: {
        ...this.state.ingredients[name],
        [IngrTypes[name]]: {
          [side]: amount
        }

      }
    });
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
      let stIngr = this.state.ingredients;

      ingredients = Object.keys(stIngr)
        .map(ingr => {
          console.log(ingr);
          return Object.keys(stIngr[ingr]).map((side) => {
            let amount = stIngr[ingr][side];
            let topping = ingr;
            console.log('props = ', typeof(topping));
            return (
              <PizzaIngredient 
                  topping={'PEPPERONI'}
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
        <BuildControls 
            currentControl={this.state.currentTab}  
            clicked={(name) => this.headerClickedHandler(name)}
            addTopping={(event, name, side, amount) => this.addToppingHandler(event, name, side, amount)}>
        </BuildControls>
      </Auxhoc>
    );
  }
}


export default PizzaBuilder;