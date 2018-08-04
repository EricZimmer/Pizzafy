import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import BuildControls from '../../components/BuildControls/BuildControls';

import * as ActionTypes from '../../store/actions/ActionTypes';

class PizzaBuilder extends Component {

  state = {
    currentTab: 'meat',
    ingredients: {
      pepperoni: {
        left: ActionTypes.NONE,
        right: ActionTypes.NONE,
        whole: ActionTypes.NONE
      },
      sausage: {
        left: ActionTypes.NONE,
        right: ActionTypes.NONE,
        whole: ActionTypes.NONE
      }
    }
  };

  headerClickedHandler = (name) => {
    
    console.log('clicked');
  }

  addToppingHandler = (event, name, side, amount) => {
    console.log(name, side, amount);
    event.preventDefault();
    event.stopPropagation();
    this.setState(prevState => {
      prevState.ingredients[name[side]] = amount
    });
  }

  render() {
    return (
      <Auxhoc>
        <Pizza />
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