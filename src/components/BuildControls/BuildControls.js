import React from 'react';
import classes from './BuildControls.css';

import BuildHeaders from '../BuildControls/BuildHeaders/BuildHeaders';

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <BuildHeaders />
  </div>
);

export default buildControls;