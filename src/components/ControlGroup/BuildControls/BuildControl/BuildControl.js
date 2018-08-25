import React from 'react';

import classes from './BuildControl.css';
import * as ToppingTypes from '../../../../INGREDIENTCONST';

const buildControl = (props) => {
     
    const baseClass = props.amount === ToppingTypes.Regular ? classes[props.side] :
        classes.Extra
    let toggledClass = props.toggled ? [baseClass, classes.ToggledOn].join(' ') : baseClass;

    return (
        <button
            className={toggledClass}

            onClick={() => props.clicked(props.side, props.amount)}>
            {props.label}
        </button>
    );
};

export default buildControl;