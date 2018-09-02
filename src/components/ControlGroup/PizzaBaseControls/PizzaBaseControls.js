import React from 'react';
import * as tTypes from '../../../ToppingTypes';
import { connect } from 'react-redux';
import cgClasses from '../../ControlGroup/ControlGroup.css';
import PizzaBaseControl from './PizzaBaseControl/PizzaBaseControl';
import * as actions from '../../../store/actions';


const pizzaBaseControls = (props) => {

  return ( 
    <div className={cgClasses.MainControlsContainer}>

      <PizzaBaseControl 
        element={props.base.Crust} changed={(element, changedObj) => props.updatePizzaBase(element, changedObj)}/>
      <PizzaBaseControl 
        element={props.base.Sauce} changed={(element, changedObj) => props.updatePizzaBase(element, changedObj)}/>
      <PizzaBaseControl 
        element={props.base.Cheese} changed={(element, changedObj) => props.updatePizzaBase(element, changedObj)}/>
    </div>
  );
  
};

const mapStateToProps = state => {
  return {
    base: state[tTypes.Base]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePizzaBase: (baseElement, changedObj) => dispatch(actions.updatePizzaBase(baseElement, changedObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(pizzaBaseControls);