import React, { Component } from 'react';
import * as tTypes from '../../../ToppingTypes';
import { connect } from 'react-redux';
import classes from '../PizzaBaseControls/PizzaBaseControls.css';
import PizzaBaseControl from './PizzaBaseControl/PizzaBaseControl';


class PizzaBaseControls extends Component {

  state = {
    /* [tTypes.Crust]: {
      type: tTypes.HandTossed,
      size: tTypes.Large
    },
    [tTypes.Sauce]: {
      type: tTypes.Sauce_Classic,
      amount: tTypes.None
    },
    [tTypes.Cheese]: {
      amount: tTypes.None
    } */
  }

  componentWillMount() {
    const { Crust, Sauce, Cheese} = this.props.base;
    this.setState({
      [tTypes.Crust]: {
        name: tTypes.Crust,
        type: Crust.type,
        size: Crust.size
      },
      [tTypes.Sauce]: {
        name: tTypes.Sauce,
        type: Sauce.type,
        amount: Sauce.amount
      },
      [tTypes.Cheese]: {
        name: tTypes.Cheese,
        amount: Cheese.amount
      }
    })
  }

  updatePizzaBase = (element) => {

  }

  render() {
    const base = this.state;
    return ( 
      <div className={classes.BaseControlsContainer}>

        <PizzaBaseControl 
          element={base.Crust}/>
        <PizzaBaseControl 
          element={base.Sauce}/>
        <PizzaBaseControl 
          element={base.Cheese}/>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    base: state.Base
  }
}

export default connect(mapStateToProps)(PizzaBaseControls);