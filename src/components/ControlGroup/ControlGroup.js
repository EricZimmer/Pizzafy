import React, { Component } from 'react';
import BuildControls from './BuildControls/BuildControls';
import classes from './ControlGroup.css';
import * as IngrTypes from '../../INGREDIENTCONST';

const TOPPINGS_MEAT = [IngrTypes.PEPPERONI, IngrTypes.SAUSAGE, IngrTypes.HAM];
const TOPPINGS_VEGGIES = ['PEPPERS', 'TOMATOES', 'MUSHROOMS'];

const ALL_TOPPINGS = {
  MEAT: [
    IngrTypes.PEPPERONI, IngrTypes.SAUSAGE, IngrTypes.HAM
  ],
  VEGGIES: [
    'PEPPERS', 'TOMATOES', 'MUSHROOMS'
  ]
};

class ControlGroup extends Component {

  componentWillMount() {
    this.setupState(ALL_TOPPINGS);
    //this.setupState(TOPPINGS_VEGGIES);
  }

  setupState = (toppingName) => {
    let initState = Object.keys(toppingName).map(topping =>{
      return toppingName[topping].map(ingr => {
        return {
          [ingr]: {
            toggled: false
          }
        }
        }).reduce((obj, item) => {
        return {...obj, ...item};
      },{});
      }).reduce((obj, item) => {
        return {...obj, ...item};
      },{});
      
    console.log('initstate ', initState);
    this.setState({...initState});
  }

  toppingGroupToggleOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.id || e.target.parentNode.id;
    console.log('id= ', id);
    if(id && this.state[id].toggled === false) {

      this.setState({
        ...this.state,
        [id]: {
          
          toggled: !this.state[id].toggled
        }
      });
    }
  }
  toppingGroupToggleOff = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.id || e.target.parentNode.id;
    console.log('id= ', id);
    if(id) {

      this.setState({
        ...this.state,
        [id]: {
          
          toggled: !this.state[id].toggled
        }
      });
    }
    this.props.clearTopping(id);
  }

  setToppingControls = (meatOrVeg) => {
    return ALL_TOPPINGS[meatOrVeg].map(topping => {
      return (
        <BuildControls 
          key={topping}
          /* id={topping} */
          clicked={(e) => this.toppingGroupToggleOn(e)}
          toggleOff={(e) => this.toppingGroupToggleOff(e)}
          topping={topping}
          addTopping={this.props.addTopping}
          clearTopping={(e) => this.toppingGroupToggleOff(e)}
          toggled={this.state[topping].toggled}/>
      );
    });
  } 

  render() {
    let toppings = this.setToppingControls('MEAT');
    return (
      <div 
        className={classes.BuildControlsContainer}>

        {this.props.children}
        <div>

        </div>
        {toppings}
      </div>
    );
  }
}

export default ControlGroup;