import React, { Component } from 'react';
import * as tTypes from '../../../ToppingTypes';
import { connect } from 'react-redux';


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
        type: Crust.type,
        size: Crust.size
      },
      [tTypes.Sauce]: {
        type: Sauce.type,
        amount: Sauce.amount
      },
      [tTypes.Cheese]: {
        amount: Cheese.amount
      }
    })
  }

  render() {
    console.log(this.state.Cheese.amount);
    return (
      <div></div>
    )
  }
};

const mapStateToProps = state => {
  return {
    base: state.Base
  }
}

export default connect(mapStateToProps)(PizzaBaseControls);