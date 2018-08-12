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

    const meatControls = MEAT_CONTROLS.map(ctrl => {
      const ctrlGroupReg = regular.map(reg => {
        console.log('reg ', reg.side, reg.toggled);

        return <BuildControl
          key={`${ctrl.type} + ${reg.side} + ${IngrTypes.REGULAR}`}
          name={ctrl.type}
          amount={IngrTypes.REGULAR}
          side={reg.side}
          class={reg.side}
          toggled={reg.toggled}
          clicked={this.toppingToggle}
        />
        
        });
      const ctrlGroupExtra = Object.keys(extra).map(pE => {
        return <BuildControl
          key={`${ctrl.type} + ${pE.side} + ${pE.amount}`}
          name={ctrl.type}
          amount={pE.amount}
          side={pE.side}
          class={pE.amount}
          toggled={pE.toggle}
          clicked={this.toppingToggle}
        />
      });

      let controls = (
          <div 
            id={ctrl.type}
            key={ctrl.type} 
            className={classes.ControlGroup}
            onClick={(e) => this.toppingGroupToggle(e)}>
              <div 
                className={classes.Label}
                onClick={(e) => this.toppingGroupToggle(e)}>
                {ctrl.label}
              </div>
              {this.state[ctrl.type].toggleToppings ? 
              <Auxhoc>
                <div className={classes.BuildControl}>{ctrlGroupReg}</div>
                {/* <div className={classes.BuildControl}>{ctrlGroupExtra}</div> */}
              </Auxhoc> : null}
          </div>
        );
      
      return (
        controls
      );
    });

    /* const meatControls = MEAT_CONTROLS.map(ctrl => {
      const ctrlGroupReg = placementRegular.map(pR => {
        return <BuildControl
          key={`${ctrl.type} + ${pR.side} + ${pR.amount}`}
          name={ctrl.type}
          amount={pR.amount}
          side={pR.side}
          class={pR.side}
          toggle={pR.toggle}
          clicked={this.toppingToggle}
        />
      });
      const ctrlGroupExtra = placementExtra.map(pE => {
        return <BuildControl
          key={`${ctrl.type} + ${pE.side} + ${pE.amount}`}
          name={ctrl.type}
          amount={pE.amount}
          side={pE.side}
          class={pE.amount}
          toggle={pE.toggle}
          clicked={this.toppingToggle}
        />
      });

      let controls = (
          <div 
            id={ctrl.type}
            key={ctrl.type} 
            className={classes.ControlGroup}
            onClick={(e) => this.toppingGroupToggle(e)}>
              <div 
                className={classes.Label}
                onClick={(e) => this.toppingGroupToggle(e)}>
                {ctrl.label}
              </div>
              {this.state[ctrl.type].toggleToppings ? 
              <Auxhoc>
                <div className={classes.BuildControl}>{ctrlGroupReg}</div>
                <div className={classes.BuildControl}>{ctrlGroupExtra}</div>
              </Auxhoc> : null}
          </div>
        );
      
      return (
        controls
      );
    }); */


    return (
      <div className={classes.BuildControlsContainer}>
       
      <div className={classes.BuildControls}>
        
            
        {meatControls}
      </div>
    </div>
    );
  }
  

  
};

export default BuildControls;