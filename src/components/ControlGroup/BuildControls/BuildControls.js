import React, { Component } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../../hoc/Auxhoc';
import * as IngrTypes from '../../../INGREDIENTCONST';

import BuildControl from './BuildControl/BuildControl';

let placementRegular = [
  { side: IngrTypes.LEFT, amount: IngrTypes.REGULAR, toggle: false},
  { side: IngrTypes.WHOLE, amount: IngrTypes.REGULAR, toggle: false},
  { side: IngrTypes.RIGHT, amount: IngrTypes.REGULAR, toggle: false}  
]

let placementExtra = [
  { side: IngrTypes.LEFT, amount: IngrTypes.EXTRA, toggle: false},
  { side: IngrTypes.WHOLE, amount: IngrTypes.EXTRA, toggle: false},
  { side: IngrTypes.RIGHT, amount: IngrTypes.EXTRA, toggle: false}
]

const MEAT_CONTROLS = [
  { label: 'Pepperoni', type: IngrTypes.PEPPERONI },
  { label: 'Sausage', type: IngrTypes.SAUSAGE },
  { label: 'Ham', type: IngrTypes.HAM },
];




class BuildControls extends Component {
  state = {
    [IngrTypes.PEPPERONI]: {
      toggleToppings: true

    },
    [IngrTypes.SAUSAGE]: {
      toggleToppings: false
    },
    [IngrTypes.HAM]: {
      toggleToppings: false
    },
    [IngrTypes.REGULAR]: [
      {side: IngrTypes.LEFT, toggled: false},
      {side: IngrTypes.WHOLE, toggled: false},
      {side: IngrTypes.RIGHT, toggled: false}
    ],
    [IngrTypes.EXTRA]: [
      {side: IngrTypes.LEFT, toggled: false},
      {side: IngrTypes.WHOLE, toggled: false},
      {side: IngrTypes.RIGHT, toggled: false}
    ],
  }

  toggle = (e) => {
    e.preventDefault();
    e.target.classList.toggle(classes.Toggle);
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
            ...this.state[id],
            toggleToppings: !this.state[id].toggleToppings
          }
        });
      }

    
  }

  toppingToggle = (e, name, side, amount, toggle) => {
    e.preventDefault();
    console.log('toppingToggle', toggle);
    let updateToggle = this.state[amount].map(amnt => {
      if(amnt.side === side) {
        return {...amnt, toggled: !amnt.toggled}
      } else return {...amnt, toggled: false };
    });
    this.setState({
      [amount]: updateToggle
    });
    console.log('updatedtoggle= ', this.state);
    this.setState({
      pepperoni: [amount, side].join('__')
    });
    this.props.addTopping(e, name, side, amount, toggle);
  }


  render() {
    
    const regular = this.state.REGULAR;
    const extra = this.state.EXTRA;
    const topping = this.props.topping;
    
    const controlsRegular = regular.map(reg => {
      console.log('reg ', reg.side, reg.toggled);

      return <BuildControl
        key={`${topping} + ${reg.side} + ${IngrTypes.REGULAR}`}
        name={topping}
        amount={IngrTypes.REGULAR}
        side={reg.side}
        class={reg.side}
        toggled={reg.toggled}
        clicked={this.toppingToggle}
      />
      
    });
    const controlsExtra = extra.map(extra => {
      return <BuildControl
        key={`${topping} + ${extra.side} + ${IngrTypes.EXTRA}`}
        name={topping}
        amount={IngrTypes.EXTRA}
        side={extra.side}
        class={IngrTypes.EXTRA}
        toggled={extra.toggle}
        clicked={this.toppingToggle}
      />
    });

    let controls = (    
      <div className={classes.BuildControls}>
        <div 
          className={classes.Label}
          /* onClick={(e) => this.toppingGroupToggle(e)} */>
          {this.props.topping}
        </div>
        <div className={classes.BuildControl}>{controlsRegular}</div>
        <div className={classes.BuildControl}>{controlsExtra}</div>
      </div>
        
    );
    return controls;
      
  };

    
}
  
export default BuildControls;