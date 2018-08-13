import React, { Component } from 'react';
import BuildControls from './BuildControls/BuildControls';
import classes from './BuildControls/BuildControls.css';
import * as IngrTypes from '../../INGREDIENTCONST';

const TOPPINGS_MEAT = [IngrTypes.PEPPERONI, IngrTypes.SAUSAGE, IngrTypes.HAM];

class ControlGroup extends Component {

  componentWillMount() {
    let initState = TOPPINGS_MEAT.map(topping =>{
      return {
        [topping]: {
          toggled: false
        }
      };
    }).reduce((obj, item) => {
      return {...obj, ...item};
    },{});
    console.log('initstate ', initState);
    this.setState({...initState});
  }

  toppingGroupToggle = (e) => {
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
  }

  render() {
    let toppingsMeat = TOPPINGS_MEAT.map(topping => {
      return (
        <BuildControls 
          key={topping}
          /* id={topping} */
          clicked={(e) => this.toppingGroupToggle(e)}
          topping={topping}
          addTopping={this.props.addTopping}
          toggled={this.state[topping].toggled}/>
      );
    });
    return (
      <div 
        className={classes.BuildControlsContainer}>
        {toppingsMeat}
      </div>
    );
  }
}

export default ControlGroup;