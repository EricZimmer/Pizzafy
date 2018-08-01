import React from 'react';
import classes from './BuildHeader.css';
import { NavLink } from 'react-router-dom';

const buildHeader = (props) => (
  <div className={classes.BuildHeader}>
    {props.children}
  </div>
);

export default buildHeader;