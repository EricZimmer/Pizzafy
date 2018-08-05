import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => {
    
    
    const label = props.amount === "EXTRA" ? "Extra" : null;
    return <button
        className={classes[props.class]}

        onClick={(event) => props.clicked(event, props.name,  props.side,  props.amount)}>
        {label}
    </button>
      
    
    
  

};

export default buildControl;