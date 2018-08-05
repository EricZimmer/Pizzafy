import React from 'react';
import classes from './BuildHeader.css';
import { NavLink } from 'react-router-dom';

const buildHeader = (props) => {
  
  return (
    <div 
      className={classes.BuildHeader}
      onClick={() => props.clicked(props.name)}>
      {props.children}
    </div>

  );
};

export default buildHeader;