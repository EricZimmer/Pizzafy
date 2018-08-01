import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    
    <div className={classes.ControlGroup}>
    
      <button
        className={classes.Left}
        >
        Left
      </button>
      <button
        className={classes.Whole}
        >
        Whole
      </button>
      <button
        className={classes.Right}
        >
        Right
      </button>
    </div>
    <div className={classes.ControlGroup}>
    
      <button
        className={classes.Left}
        >
        Left
      </button>
      <button
        className={classes.Whole}
        >
        Whole
      </button>
      <button
        className={classes.Right}
        >
        Right
      </button>
    </div>
    
  </div>

);

export default buildControl;