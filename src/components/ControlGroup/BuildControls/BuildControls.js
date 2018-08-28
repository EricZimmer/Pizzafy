import React, { Component } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../../hoc/Auxhoc';
import * as ToppingTypes from '../../../ToppingTypes';

import { connect } from 'react-redux';

import BuildControl from './BuildControl/BuildControl';


class BuildControls extends Component {
  state = {
    toggledOn: false,
    [ToppingTypes.Regular]: {
      [ToppingTypes.Left]: false,
      [ToppingTypes.Whole]: false,
      [ToppingTypes.Right]: false
    },
    [ToppingTypes.Extra]: {
      [ToppingTypes.Left]: false,
      [ToppingTypes.Whole]: false,
      [ToppingTypes.Right]: false
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
    })
    .reduce((obj, item) => {
      return {...obj, ...item};
    },{});
  }

  componentWillMount() {
    // reinitiate component state to match already selected toppings stored in redux  
    const amount = this.props.toppings[this.props.toppingType][this.props.toppingName];
    if(amount) {
      const regular = this.updateStateFromProps(amount[ToppingTypes.Regular], ToppingTypes.Regular);
      const extra = this.updateStateFromProps(amount[ToppingTypes.Extra], ToppingTypes.Extra);
      this.setState({
        [ToppingTypes.Regular] : {...regular},
        [ToppingTypes.Extra]: {...extra}
      });
    }
  }


  
  toppingToggle = (amount, side, toggledOn) => {
    
    // toggle specific controls false, depending on the current side and amount selected by user
    console.log(toggledOn)
    let toppingToDisable = {}
    if(amount === ToppingTypes.Regular) { 
      // if amount is regular, toggle off extra for current side and whole
        toppingToDisable = { 
          amount: ToppingTypes.Extra,
          sides: {
            /* ...this.state[ToppingTypes.Extra], */
            [ToppingTypes[side]]: false,
            [ToppingTypes.Whole]: false
          }
        };
    } else if(amount === ToppingTypes.Extra) {
        if(side === ToppingTypes.Whole) {
        // if amount is extra and side is whole, toggle off all regular
          toppingToDisable = { 
              amount: ToppingTypes.Regular,
              sides: {
                [ToppingTypes.Left]: false,
                [ToppingTypes.Whole]: false,
                [ToppingTypes.Right]: false
              }
          };
        } else {
          //if amount is extra and side is left/right, toggle off regular for current side
            toppingToDisable = { 
              amount: ToppingTypes.Regular,
              sides: {
                /* ...this.state[ToppingTypes.Regular], */
                [ToppingTypes[side]]: false
              }
            };
        }
    }     
    let updateToggle = Object.keys(this.state[amount]).map(stateSide => {
      if(stateSide === side) {
        // return updateToggle = side: !state.amount.side (toggle on or off)
        return {[stateSide]: !this.state[amount][stateSide]};
      } else return {[stateSide]: false };
    }).reduce((obj, item) => {
        return {...obj, ...item};
    },{});

    console.log('ttd = ', toppingToDisable, ' tT = ', updateToggle)
    for (let key in toppingToDisable.sides) {
      if(this.state[toppingToDisable.amount][key] === true && toppingToDisable.sides[key] === false) {
        console.log('turning off ', 'side', toppingToDisable.amount, key)
        this.props.removeTopping(this.props.toppingType, this.props.toppingName, toppingToDisable.amount, key);
      }
    }

    for (let key in updateToggle) {
      if (this.state[amount][key] === true && updateToggle[key] === false ) {
        console.log('turning off = ', amount, ' side =', key)
        this.props.removeTopping(this.props.toppingType, this.props.toppingName, amount, key);
      }
    }

    if (toggledOn === true) { 
      this.props.removeTopping(this.props.toppingType, this.props.toppingName, amount, side);
    } else {
      this.props.addTopping(this.props.toppingType, this.props.toppingName, amount, side);
    }

    let regular = ToppingTypes.None;
    let extra = ToppingTypes.None;
 
    // update state for the last-clicked toggle  
    /* this.setState( {
      [amount]: updateToggle
    }, () => {
      // callback searches to find a toggle set to true for regular and extra
      for (let key in this.state[ToppingTypes.Regular]) {
        if (this.state[ToppingTypes.Regular][key]) {
          regular = key;
        }
      }
      for (let key in this.state[ToppingTypes.Extra]) {
        if (this.state[ToppingTypes.Extra][key]) {
          extra = key;
        }
      }
      // if no topping selected, remove the current topping and toggle off its main controls
      if(regular === ToppingTypes.None && extra === ToppingTypes.None) {
        //this.props.removeTopping(this.props.toppingType, this.props.toppingName);
        this.setState({toggledOn: false});
      } 
      // else, a topping was selected, add it to the toppings state in redux with type, name, and applicable sides for regular and extra
      else {
        if (toggledOn === false) {

          //this.props.addTopping(this.props.toppingType, this.props.toppingName, regular, extra);
        }
      }
    }); */
    this.setState({
      ...this.state,
      [toppingToDisable.amount]: {
        ...this.state[toppingToDisable.amount],
        ...toppingToDisable.sides
      },
      [amount]: {
        ...this.state[amount],
        ...updateToggle
      }
    });
    
  }

  toggleOn = () => {
    
    if(!this.state.toggledOn) {
      // open topping controls and by default, select the current topping as whole and regular
      this.toppingToggle(ToppingTypes.Regular, ToppingTypes.Whole, false);
      this.setState({toggledOn: true});
    }
  }

  toggleOff = () => {
    this.setState({
      toggledOn: false,
      [ToppingTypes.Regular]: {
        [ToppingTypes.Left]: false,
        [ToppingTypes.Whole]: false,
        [ToppingTypes.Right]: false
      },
      [ToppingTypes.Extra]: {
        [ToppingTypes.Left]: false,
        [ToppingTypes.Whole]: false,
        [ToppingTypes.Right]: false
      }
    });
    this.props.removeTopping(this.props.toppingType, this.props.toppingName);
  }

  createControls = (toppingAmount) => {
    const stAmount = this.state[toppingAmount];
    const topping = this.props.toppingName;
    return Object.keys(stAmount).map(regOrExtra => {
      return <BuildControl
        key={`${topping} ${regOrExtra} ${toppingAmount}`}
        name={topping}
        amount={toppingAmount}
        side={regOrExtra}
        label={toppingAmount === ToppingTypes.Extra ? 'Extra' : null}
        toggled={stAmount[regOrExtra]}
        clicked={this.toppingToggle} /> 
    });
  }

  render() {
    
    const controlsRegular = this.createControls(ToppingTypes.Regular);
    const controlsExtra = this.createControls(ToppingTypes.Extra);

    let closeButton = null;
    let toppingControls = null;
    const classNames = [classes.BuildControls, this.state.toggledOn ? null : classes.MousePointer].join(' ');

    if (this.state.toggledOn) {
      closeButton = (<div className={classes.Checked} onClick={() => this.toggleOff()}>
        X</div>);
      toppingControls = (<Auxhoc>
          <div className={classes.BuildControl}>{controlsRegular}</div>
          <div className={classes.BuildControl}>{controlsExtra}</div>
        </Auxhoc>);
    }

    return (    
      <div id={this.props.toppingName} className={classNames}
        onClick={() => this.toggleOn()}>
        <div className={classes.LabelHeader}onClick={() => this.toggleOn()}>
          <div className={classes.Label}>{this.props.toppingName}</div>
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
  
export default connect(mapStateToProps)(BuildControls);