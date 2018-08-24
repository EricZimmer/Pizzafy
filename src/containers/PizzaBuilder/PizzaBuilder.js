import React, { Component } from 'react';

import Auxhoc from '../../hoc/Auxhoc';
import classes from './PizzaBuilder.css';
import Pizza from '../../components/Pizza/Pizza';
import BuildHeaders from '../../components/BuildHeaders/BuildHeaders';
import BuildControls from '../../components/ControlGroup/BuildControls/BuildControls';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import IngredientSummary from '../../components/Pizza/IngredientSummary/IngredientSummary';

import * as ToppingTypes from '../../INGREDIENTCONST';
import PizzaIngredient from '../../components/Pizza/PizzaIngredient/PizzaIngredient';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class PizzaBuilder extends Component {

  state = {
    currentTab: 'Base',
    /* ingredients: {
  
    } */
  };

  componentDidMount() {
    this.props.initToppingHandler();
  }

  headerClickedHandler = (name) => {
    this.setState({currentTab: name})
  }

  addToppingHandler = (name, reg, extra) => {
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [ToppingTypes[name]]: {
          /* ...this.state.ingredients[name], */
          /* ...newTopping, */
          [ToppingTypes.Regular]: reg,
          [ToppingTypes.Extra]: extra
        }
      }
    }
    this.setState({...newState});
  }

  clearToppingHander = (name) => {
    const newState = {
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [ToppingTypes[name]]: {
          /* ...this.state.ingredients[name], */
          [ToppingTypes.Regular]: ToppingTypes.None,
          [ToppingTypes.Extra]: ToppingTypes.None
        }
      }
    }
    this.setState({...newState});
  }

  toppingGroup = ((<ControlGroup 
    toppingType={'Meat'}
    addTopping={(type, name, reg, extra) => this.props.addToppingHandler(type, name, reg, extra) }
    removeTopping={(type, name) => this.props.removeToppingHandler(type, name)}>
  </ControlGroup>));

  createToppings = (tType) => {
    return Object.keys(tType).map(tName => {
      return Object.keys(tType[tName]).map((amount) => {
        let side = tType[tName][amount];
        return (
          <PizzaIngredient 
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
    let toppingsMeat = null;
    let toppingsVeggies = null;
    if (stateToppings != null) {
      toppingsMeat = this.createToppings(stateToppings.Meat)
    }
    console.log(toppingsMeat);
 
    let controlGroup = <div>Base</div>;
    controlGroup = this.state.currentTab === 'Base' ? controlGroup : this.toppingGroup ;
    return (
      <div className={classes.PizzaBuilder}>
        <Pizza 
          ingredients={toppingsMeat}/>
        {/* <IngredientSummary ingredients={stIngredients}/> */}
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
    initToppingHandler: () => dispatch(actions.initToppings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaBuilder);