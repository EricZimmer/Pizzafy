import React, { Component } from 'react';
import classes from './ToppingControls.css';
import cgClasses from '../../ControlGroup/ControlGroup.css';
import Auxhoc from '../../../hoc/Auxhoc';
import * as tTypes from '../../../ToppingTypes';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import ToppingControl from './ToppingControl/ToppingControl';

const setToggleRules = (amount, side) => {
  let toggleRules = {};
  // toggle specific controls false for the opposite amount of the one the user just selected (regular vs extra)
  if(amount === tTypes.Regular) { 
    if(side === tTypes.Whole) { // if amount is regular and side is whole, toggle off all extra
      toggleRules = { 
        amount: tTypes.Extra,
        sides: {
          [tTypes.Left]: false,
          [tTypes.Whole]: false,
          [tTypes.Right]: false
        }
      };
    } else { // if amount is regular, toggle off extra for current side and whole
        toggleRules = { 
          amount: tTypes.Extra,
          sides: {
            [tTypes[side]]: false,
            [tTypes.Whole]: false
          }
        };
    } 
  } else if(amount === tTypes.Extra) {
      if(side === tTypes.Whole) { // if amount is extra and side is whole, toggle off all regular
        toggleRules = { 
            amount: tTypes.Regular,
            sides: {
              [tTypes.Left]: false,
              [tTypes.Whole]: false,
              [tTypes.Right]: false
            }
        };
      } else { //if amount is extra and side is left/right, toggle off regular for current side
          toggleRules = { 
            amount: tTypes.Regular,
            sides: {
              [tTypes[side]]: false,
              [tTypes.Whole]: false
            }
          };
      }
  }
  return toggleRules; 
}

class ToppingControls extends Component {
  state = {
    toggledOn: false,
    [tTypes.Regular]: {
      [tTypes.Left]: false,
      [tTypes.Whole]: false,
      [tTypes.Right]: false
    },
    [tTypes.Extra]: {
      [tTypes.Left]: false,
      [tTypes.Whole]: false,
      [tTypes.Right]: false
    }
  }

  updateStateFromProps = (amount, stAmount) => {
    //update state from redux store props when switching components to preserve button toggle states
    return Object.keys(this.state[stAmount]).map(side => {
      if (amount === side) {
        this.setState({toggledOn: true});
        return {[side]: true};
      }
      else return {[side]: false};
    }).reduce((obj, item) => {
      return {...obj, ...item};
    },{});
  }

  componentWillMount() {
    // reinitiate component state to match already selected toppings stored in redux  
    const amount = this.props.toppings[this.props.toppingType][this.props.toppingName] || null;
    if(amount!== null) {
      const regular = this.updateStateFromProps(amount[tTypes.Regular], tTypes.Regular);
      const extra = this.updateStateFromProps(amount[tTypes.Extra], tTypes.Extra);
      this.setState({
        [tTypes.Regular]: {...regular},
        [tTypes.Extra]: {...extra}
      });
    }
  }


  
  toppingToggle = (amount, side) => {
    const { toppingType, toppingName } = this.props;
    const toggleRules = setToggleRules(amount, side);
    
    let regOrExtraToggles = Object.keys(this.state[amount]).map(stateSide => {
      if(stateSide === side) {
        // toggle on or off the user-selected side for the given amount (either regular or extra)
        return {[stateSide]: !this.state[amount][stateSide]};
      } else return {[stateSide]: false }; // toggle off the other 2 sides of the selected amount
    }).reduce((obj, item) => {
        return {...obj, ...item};
    },{});

    // the following two loops check the current amount & side toggle of the state, if true (toggled on), && based off of the above checks, if same amount & side should be toggled off, then remove the topping from redux
    for (let key in toggleRules.sides) {
      if(this.state[toggleRules.amount][key] === true && toggleRules.sides[key] === false ) {
        this.props.removeTopping(toppingType, toppingName, toggleRules.amount);
      }
    }
    for (let key in regOrExtraToggles) {
      if (this.state[amount][key] === true && regOrExtraToggles[key] === false ) {
        this.props.removeTopping(toppingType, toppingName, amount);
      }
    }

    if (this.state[amount][side] === false) { 
      // add the selected topping's amount and side to redux
      this.props.addTopping(toppingType, toppingName, amount, side);
    }

    let regular = false, extra = false;

    // set state toggles to reflect above both checks (toggleRules & regOrExtraToggles)
    this.setState({
      ...this.state,
      [toggleRules.amount]: {
        ...this.state[toggleRules.amount],
        ...toggleRules.sides
      },
      [amount]: {
        ...this.state[amount],
        ...regOrExtraToggles
      }
    }, () => {
      // callback searches to find a toggle set to true for regular and extra
      for (let key in this.state[tTypes.Regular]) {
        if (this.state[tTypes.Regular][key]) regular = true;
        if (this.state[tTypes.Extra][key]) extra = true;
      }
      // if no topping selected, hide/toggle off its main controls
      if( !regular && !extra ) this.setState({toggledOn: false});
    });
  }

  toggleOn = () => {
    
    if(!this.state.toggledOn) {
      // open topping controls and by default, select the current topping as whole and regular
      this.toppingToggle(tTypes.Regular, tTypes.Whole);
      this.setState({toggledOn: true});
    }
  }

  toggleOff = () => {
    this.setState({
      toggledOn: false,
      [tTypes.Regular]: {
        [tTypes.Left]: false,
        [tTypes.Whole]: false,
        [tTypes.Right]: false
      },
      [tTypes.Extra]: {
        [tTypes.Left]: false,
        [tTypes.Whole]: false,
        [tTypes.Right]: false
      }
    });
    this.props.clearTopping(this.props.toppingType, this.props.toppingName);
  }

  createControls = (toppingAmount) => {
    const stAmount = this.state[toppingAmount];
    const topping = this.props.toppingName;
    return Object.keys(stAmount).map(regOrExtra => {
      return <ToppingControl
        key={`${topping} ${regOrExtra} ${toppingAmount}`}
        name={topping}
        amount={toppingAmount}
        side={regOrExtra}
        label={toppingAmount === tTypes.Extra ? 'Extra' : null}
        toggled={stAmount[regOrExtra]}
        clicked={this.toppingToggle} /> 
    });
  }

  render() {
    
    const controlsRegular = this.createControls(tTypes.Regular);
    const controlsExtra = this.createControls(tTypes.Extra);

    let closeButton = null;
    let toppingControls = null;
    const classNames = [classes.ToppingControls, this.state.toggledOn ? null : classes.MousePointer].join(' ');

    if (this.state.toggledOn) {
      closeButton = (<div className={classes.Checked} onClick={() => this.toggleOff()}>
        X</div>);
      toppingControls = (<Auxhoc>
          <div className={classes.ToppingControl}>{controlsRegular}</div>
          <div className={classes.ToppingControl}>{controlsExtra}</div>
        </Auxhoc>);
    }

    return (    
      <div className={classNames}>
        <div className={cgClasses.LabelHeader}onClick={this.toggleOn}>
          <div className={cgClasses.Label}>{this.props.toppingName.toUpperCase()}</div>
          {closeButton}    
        </div>
        {toppingControls}
      </div>    
    );  
  };

    
};

const mapStateToProps = (state, ownProps) => {

  return {
    toppings: state.Toppings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTopping: (tType, tName, amount, side) => dispatch(actions.addTopping(tType, tName, amount, side)),
    removeTopping: (tType, tName, amount) => dispatch(actions.removeTopping(tType, tName, amount)),
    clearTopping: (tType, tName) => dispatch(actions.clearTopping(tType, tName))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ToppingControls);