import React from 'react';
import classes from './BuildHeader.css';
import { NavLink } from 'react-router-dom';

const buildHeader = (props) => {

  return (
    <div 
      className={`${classes.BuildHeader} ${classes[props.classes]}`}
      onClick={() => props.clicked(props.link)}>
        {props.label}
      
    </div>

  );
};

export default buildHeader;