import React, { Component } from 'react';
import BuildControls from './BuildControls/BuildControls';
import classes from './ControlGroup.css';
import * as ToppingTypes from '../../INGREDIENTCONST';

const Toppings_Meat = [ToppingTypes.Pepperoni, ToppingTypes.Sausage, ToppingTypes.Ham];
const Toppings_Veggies = ['Peppers', 'Tomatoes', 'MUSHROOMS'];

const ALL_Toppings = {
  Meat: [
    ToppingTypes.Pepperoni, ToppingTypes.Sausage, ToppingTypes.Ham
  ],
  Veggies: [
    'Peppers', 'Tomatoes', 'MUSHROOMS'
  ]
};

class ControlGroup extends Component {

  componentWillMount() {
    this.setupState(ALL_Toppings);
    //this.setupState(Toppings_Veggies);
  }

  componentWillUnmount() {
    console.log('hi');
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
    //e.stopPropagation();
    const id = e.id || e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id;
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
    //e.preventDefault();
    //e.stopPropagation();
    console.log('e= ', e.target, 'e.target.parent'/* , e.target.parentNode */);
    const id = e.id || e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id;
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

  setToppingControls = (MeatOrVeg) => {
    return ALL_Toppings[MeatOrVeg].map(topping => {
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
    let toppings = this.setToppingControls('Meat');
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