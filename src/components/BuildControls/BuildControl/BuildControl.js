import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => {
    
    
    const label = props.amount === "Extra" ? "Extra" : null;
    return <button
        className={classes[props.class]}

        onClick={() => props.clicked( props.name,  props.side,  props.amount)}>
        {label}
    </button>
      
    
    
  

};

export default buildControl;