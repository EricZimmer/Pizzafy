import React, { Component } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../hoc/Auxhoc';
import * as IngrTypes from '../../INGREDIENTCONST';

import BuildControl from './BuildControl/BuildControl';

const placementRegular = [
  { side: IngrTypes.LEFT, amount: IngrTypes.REGULAR},
  { side: IngrTypes.WHOLE, amount: IngrTypes.REGULAR},
  { side: IngrTypes.RIGHT, amount: IngrTypes.REGULAR}  
]

const placementExtra = [
  { side: IngrTypes.LEFT, amount: IngrTypes.EXTRA},
  { side: IngrTypes.WHOLE, amount: IngrTypes.EXTRA},
  { side: IngrTypes.RIGHT, amount: IngrTypes.EXTRA}
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
    }
  }

  toggle = (e) => {
    e.preventDefault();
    e.target.classList.toggle(classes.Toggle);
  }
  

  toppingToggle = (e) => {
    e.preventDefault();
    
    const id = e.target.id || e.target.parentNode.id;
    
      this.setState({[id]: {toggleToppings: !this.state[id].toggleToppings}});

    document.getElementById(id).scrollIntoView(false);
    /* console.log(document.getElementById(id)); */
  }

  render() {
    const meatControls = MEAT_CONTROLS.map(ctrl => {
      const ctrlGroupReg = placementRegular.map(pR => {
        return <BuildControl
          key={`${ctrl.type} + ${pR.side} + ${pR.amount}`}
          name={ctrl.type}
          amount={pR.amount}
          side={pR.side}
          class={pR.side}
          clicked={this.props.addTopping}
        />
      });
      const ctrlGroupExtra = placementExtra.map(pE => {
        return <BuildControl
          key={`${ctrl.type} + ${pE.side} + ${pE.amount}`}
          name={ctrl.type}
          amount={pE.amount}
          side={pE.side}
          class={pE.amount}
          clicked={this.props.addTopping}
        />
      });
      /* const controls = this.state.Pepperoni.toggleToppings ?
        <Auxhoc>
          <div className={classes.BuildControl}>{ctrlGroupReg}</div>
          <div className={classes.BuildControl}>{ctrlGroupExtra}</div>
        </Auxhoc> : null; */
      let controls = (
          <div 
            id={ctrl.type}
            key={ctrl.type} 
            className={classes.ControlGroup}
            onClick={(e) => this.toppingToggle(e)}>
              <div 
                className={classes.Label}
                onClick={(e) => this.toppingToggle(e)}>
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
    });

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