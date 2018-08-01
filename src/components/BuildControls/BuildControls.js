import React from 'react';
import classes from './BuildControls.css';

import BuildHeaders from '../BuildControls/BuildHeaders/BuildHeaders';
import BuildControl from './BuildControl/BuildControl';

const MEAT_CONTROLS = [
  { label: 'Pepperoni', type: 'pepperoni' },
  { label: 'Sausage', type: 'sausage' }
];

const meatControls = MEAT_CONTROLS.map(ctrl => {
  return <BuildControl
    key={ctrl.label}
    label={ctrl.label}
  />
});

const buildControls = (props) => (
  <div className={classes.BuildControlsContainer}>
    <div className={classes.BuildControls}>
      <BuildHeaders />
      {meatControls}
    </div>
  
  </div>
);

export default buildControls;