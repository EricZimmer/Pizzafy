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
      [IngrTypes.PEPPERONI]: {
        [IngrTypes.LEFT]: IngrTypes.NONE,
        [IngrTypes.RIGHT]: IngrTypes.NONE,
        [IngrTypes.WHOLE]: IngrTypes.NONE
      },
      [IngrTypes.SAUSAGE]: {
        [IngrTypes.LEFT]: IngrTypes.NONE,
        [IngrTypes.RIGHT]: IngrTypes.NONE,
        [IngrTypes.WHOLE]: IngrTypes.NONE
      }
    }
  };

  headerClickedHandler = (name) => {
    
    /* console.log('clicked'); */
  }

  addToppingHandler = (event, name, side, amount) => {
    event.preventDefault();
    event.stopPropagation();
    let newTopping = {};
    switch(amount) {
      case(IngrTypes.REGULAR):
        switch(side) {
          case(IngrTypes.LEFT):
            newTopping = {
              [IngrTypes.RIGHT]: IngrTypes.NONE,
              [IngrTypes.WHOLE]: IngrTypes.NONE
            }
           break;
          case(IngrTypes.RIGHT):
            newTopping = {
              [IngrTypes.LEFT]: IngrTypes.NONE,
              [IngrTypes.WHOLE]: IngrTypes.NONE
            }
           break;
          case(IngrTypes.WHOLE):
            newTopping = {
              [IngrTypes.LEFT]: IngrTypes.NONE,
              [IngrTypes.RIGHT]: IngrTypes.NONE
            }
           break;
          default: newTopping = null;
        }
        break;
      case(IngrTypes.EXTRA):
        switch(side) {
          case(IngrTypes.LEFT):
            newTopping = {
              [IngrTypes.RIGHT]: IngrTypes.NONE,
              [IngrTypes.WHOLE]: IngrTypes.NONE
            }
          break;
          case(IngrTypes.RIGHT):
            newTopping = {
              [IngrTypes.LEFT]: IngrTypes.NONE,
              [IngrTypes.WHOLE]: IngrTypes.NONE
            }
          break;
          case(IngrTypes.WHOLE):
            newTopping = {
              [IngrTypes.LEFT]: IngrTypes.NONE,
              [IngrTypes.RIGHT]: IngrTypes.NONE
            }
          break;
          default: newTopping = null;
        }
        break;
        default: newTopping = null;
      return newTopping;
    }
    console.log(newTopping);
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [IngrTypes[name]]: {
          ...this.state.ingredients[name],
          ...newTopping,
          [side]: amount
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
          return Object.keys(stIngr[ingr]).map((side) => {
            let amount = stIngr[ingr][side];
            return (
              <PizzaIngredient 
                  key={`${ingr} + '_' ${side} + '_' ${amount}`}
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