import React, { Component } from 'react';
import BuildHeader from './BuildHeader/BuildHeader';
import classes from '../BuildHeaders/BuildHeaders.css';
import * as tTypes from '../../ToppingTypes';


const headerOptions = [tTypes.Base, tTypes.Toppings, tTypes.Review];

class BuildHeaders extends Component {
  state = {
    currentHeader: tTypes.Base
  }

  changeHeader = (link) => {
    this.setState({currentHeader: link});
    this.props.clicked(link);
  }

  render() {
    const index = headerOptions.indexOf(this.state.currentHeader);
    const back = index - 1 >= 0 ? 
      <BuildHeader classes={'Back'}clicked={this.changeHeader} link={headerOptions[index - 1]} label={'<  Back'}/> : null;
    const next = index + 1 < headerOptions.length ?
      <BuildHeader classes={'Next'}clicked={this.changeHeader} link={headerOptions[index + 1]} label={'Next  >'}/> : null;
    
      
    return(
      <div className={classes.BuildHeadersContainer}>
        <div className={classes.BuildHeaders}>{back}{next}</div>
        <div className={classes.Heading}>{this.state.currentHeader}</div>
      </div>
    );
  }
  
};

export default BuildHeaders;