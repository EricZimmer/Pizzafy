import React from 'react';
import classes from './BuildHeader.css';
import { NavLink } from 'react-router-dom';

const buildHeader = (props) => (
  <li className={classes.BuildHeader}>
    {props.children}
  </li>
);

export default buildHeader;