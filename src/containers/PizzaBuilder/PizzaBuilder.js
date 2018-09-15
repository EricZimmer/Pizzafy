import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import classes from './PizzaBuilder.css';
import cgClasses from '../../components/ControlGroup/ControlGroup.css';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import ToppingControls from '../../components/ControlGroup/ToppingControls/ToppingControls';
import PizzaBaseControls from '../../components/ControlGroup/PizzaBaseControls/PizzaBaseControls';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import ToppingSummary from '../../components/Pizza/ToppingSummary/ToppingSummary';
import withErrorHandler from '../../hoc/withErrorHandler';

import * as tTypes from '../../ToppingTypes';
import PizzaTopping from '../../components/Pizza/PizzaTopping/PizzaTopping';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import axios from '../../axios-config';

class PizzaBuilder extends Component {

  state = {
    currentControls: tTypes.Base,
    currentTopping: tTypes.Meats
  };

  componentWillMount() {
    //this.props.initToppingHandler();
  }


  headerClickedHandler = (name) => {
    this.setState({currentControls: name})
  }

  
  finalToppings = () => {
    
    const meats = this.props.toppings.Meats;
    const veggies = this.props.toppings.Veggies;
    let objMeats = {};
    for ( let key in meats) {
      if (meats[key].Regular !== tTypes.None) { 
        objMeats[key] = {[tTypes.Regular]: meats[key].Regular};
      }
      if(meats[key].Extra !== tTypes.None) {
        objMeats[key] = {
          ...objMeats[key],
          [tTypes.Extra]: meats[key].Extra
        }
      }
    }
    return {[tTypes.Meats]: {...objMeats}};
  }

  createToppings = (tType) => {
    return Object.keys(tType).map(tName => {
      return Object.keys(tType[tName]).map((amount) => {
        let side = tType[tName][amount];
        return (
          <PizzaTopping 
              key={`${tName} + '_' ${amount} + '_' ${side}`}
              topping={tName}
              side={side}
              amount={amount}/>
          );
      });
    });
  }

  getCurrentControls = () => {
    switch(this.state.currentControls) {
      case tTypes.Base: return <PizzaBaseControls />;
      case tTypes.Toppings: return <ControlGroup toppingType={this.state.currentTopping}/>;
      case tTypes.Review: return <ToppingSummary toppings={this.finalToppings()} price={this.props.price}/>;
      default: return <PizzaBaseControls />;
    }
  }

  toppingSwitch = (toppingType) => {
    this.setState({currentTopping: toppingType});
  }

  render() {
    
    const stateToppings = this.props.toppings !== null ? this.props.toppings
      : null;
    let toppingsMeats = null;
    let toppingsVeggies = null;
    if (stateToppings.Meats != null) {
      toppingsMeats = this.createToppings(stateToppings.Meats)
    }
    if (stateToppings.Veggies != null) {
      toppingsVeggies = this.createToppings(stateToppings.Veggies)
    }
    
    const currentToppings = this.state.currentTopping;
    const meatOrVeg = this.state.currentControls !== tTypes.Toppings ? null 
      : <div className={cgClasses.MeatOrVeg}>
          <div className={currentToppings === tTypes.Meats ? cgClasses.MOVToggle : null} onClick={() => this.toppingSwitch(tTypes.Meats)}>Meats</div>
          <div className={currentToppings === tTypes.Veggies ? cgClasses.MOVToggle : null} onClick={() => this.toppingSwitch(tTypes.Veggies)}>Veggies</div>
        </div>
    //const controlGroup = this.getCurrentControls();

    return (
      <div className={classes.PizzaBuilder}>
        <Pizza 
          Toppings={[...toppingsMeats, ...toppingsVeggies]}/>
        
        <div className={classes.PizzaBuilderContainer}>
          <div className={classes.Price}>Total: ${this.props.price.toFixed(2)}</div>
          <BuildHeaders 
            currentHeader={this.state.currentControls}
            clicked={ this.headerClickedHandler}/>
          <div className={cgClasses.MainControlsContainer}>
            {meatOrVeg}
            {this.getCurrentControls()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toppings: state.Toppings,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    /* addToppingHandler: (tType, tName, amount, side) => dispatch(actions.addTopping(tType, tName, amount, side)),
    removeToppingHandler: (tType, tName, amount, side) => dispatch(actions.removeTopping(tType, tName, amount, side)),
    clearToppingHandler: (tType, tName) => dispatch(actions.clearTopping(tType, tName)), */
    initToppingHandler: () => dispatch(actions.initToppings()),
    compileToppings: (toppings) => dispatch(actions.compileToppings(toppings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaBuilder);