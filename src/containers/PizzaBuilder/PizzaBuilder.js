import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import classes from './PizzaBuilder.css';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import BuildControls from '../../components/ControlGroup/BuildControls/BuildControls';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import ToppingSummary from '../../components/Pizza/ToppingSummary/ToppingSummary';

import * as ToppingTypes from '../../ToppingTypes';
import PizzaTopping from '../../components/Pizza/PizzaTopping/PizzaTopping';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class PizzaBuilder extends Component {

  state = {
    currentTab: 'Base',
    /* Toppings: {
  
    } */
  };

  componentDidMount() {
    //this.props.initToppingHandler();
  }

  componentWillReceiveProps() {
    
  }

  headerClickedHandler = (name) => {
    this.setState({currentTab: name})
  }

  
  finalToppings = () => {
    
    
    const meats = this.props.toppings.Meats;
    const veggies = this.props.toppings.Veggies;
    let objMeats = {}
    for ( let key in meats) {
      if (meats[key].Regular !== ToppingTypes.None) { 
        objMeats[key] = {[ToppingTypes.Regular]: meats[key].Regular};
      }
      if(meats[key].Extra !== ToppingTypes.None) {
        objMeats[key] = {
          ...objMeats[key],
          [ToppingTypes.Extra]: meats[key].Extra
        }
      }
    }
    return {[ToppingTypes.Meats]: {...objMeats}};
  }

  toppingGroup = ((<ControlGroup 
    toppingType={'Meats'}
    addTopping={(type, name, reg, extra) => this.props.addToppingHandler(type, name, reg, extra) }
    removeTopping={(type, name) => this.props.removeToppingHandler(type, name)}>
  </ControlGroup>));

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

  render() {
    const stateToppings = this.props.toppings !== null ? this.props.toppings
      : null;
    let toppingsMeats = null;
    let toppingsVeggies = null;
    if (stateToppings != null) {
      toppingsMeats = this.createToppings(stateToppings.Meats)
    }
    
    const toppingList = this.finalToppings();
 
    let controlGroup = <div>Base</div>;
    controlGroup = this.state.currentTab === 'Base' ? controlGroup : this.toppingGroup ;
    return (
      <div className={classes.PizzaBuilder}>
        <Pizza 
          Toppings={toppingsMeats}/>
        <ToppingSummary toppings={toppingList}/>
        <div className={classes.MainControlsContainer}>
          <BuildHeaders 
          clicked={ this.headerClickedHandler}/>
          
         {controlGroup}
        
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toppings: state.Toppings
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToppingHandler: (tType, tName, reg, extra) => dispatch(actions.addTopping(tType, tName, reg, extra)),
    removeToppingHandler: (tType, tName) => dispatch(actions.removeTopping(tType, tName)),
    initToppingHandler: () => dispatch(actions.initToppings()),
    compileToppings: (toppings) => dispatch(actions.compileToppings(toppings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaBuilder);