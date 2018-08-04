import React from 'react';
import classes from './BuildControls.css';
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
  { label: 'Pepperoni', type: 'pepperoni' },
  { label: 'Sausage', type: 'sausage' }
];



const buildControls = (props) => {
  const meatControls = MEAT_CONTROLS.map(ctrl => {
    const ctrlGroupReg = placementRegular.map(pR => {
      return <BuildControl
        key={`${ctrl.type} + ${pR.side} + ${pR.amount}`}
        name={ctrl.type}
        amount={pR.amount}
        side={pR.side}
        class={pR.side}
        clicked={props.addTopping}
      />
    });
    const ctrlGroupExtra = placementExtra.map(pE => {
      return <BuildControl
        key={`${ctrl.type} + ${pE.side} + ${pE.amount}`}
        name={ctrl.type}
        amount={pE.amount}
        side={pE.side}
        class={pE.amount}
        clicked={props.addTopping}
      />
    });
    return (
      <div className={classes.ControlGroup}>
        <div className={classes.Label}>{ctrl.label}</div>
        <div className={classes.BuildControl}>{ctrlGroupReg}</div>
        <div className={classes.BuildControl}>{ctrlGroupExtra}</div>
      </div>
    );
  });

  let currentControl = props.currentControl;
  return (
    <div className={classes.BuildControlsContainer}>
       
      <div className={classes.BuildControls}>
        
            
        {meatControls}
      </div>
    </div>
  );
  
};

export default buildControls;