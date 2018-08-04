import React, { Component } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../hoc/Auxhoc';
import * as ActionTypes from '../../store/actions/ActionTypes';

import BuildControl from './BuildControl/BuildControl';

const placementRegular = [
  { side: ActionTypes.LEFT, amount: ActionTypes.REGULAR},
  { side: ActionTypes.WHOLE, amount: ActionTypes.REGULAR},
  { side: ActionTypes.RIGHT, amount: ActionTypes.REGULAR}  
]

const placementExtra = [
  { side: ActionTypes.LEFT, amount: ActionTypes.EXTRA},
  { side: ActionTypes.WHOLE, amount: ActionTypes.EXTRA},
  { side: ActionTypes.RIGHT, amount: ActionTypes.EXTRA}
]

const MEAT_CONTROLS = [
  { label: 'Pepperoni', type: 'Pepperoni' },
  { label: 'Sausage', type: 'Sausage' },
  { label: 'Ham', type: 'Ham' },
];




class BuildControls extends Component {
  state = {
    Pepperoni: {
      toggleToppings: false

    },
    Sausage: {
      toggleToppings: false
    },
    Ham: {
      toggleToppings: false
    }
  }

  toppingToggle = (e) => {
    e.preventDefault();
    const id = e.target.id;
    this.setState({[id]: {toggleToppings: !this.state[id].toggleToppings}});
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
            <div className={classes.Label}>{ctrl.label}</div>
            {this.state[ctrl.type].toggleToppings ? <Auxhoc>
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