import React, { Component } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../../hoc/Auxhoc';
import * as ToppingTypes from '../../../INGREDIENTCONST';

import BuildControl from './BuildControl/BuildControl';

class BuildControls extends Component {
  state = {
    
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

  toggle = (e) => {
    e.preventDefault();
    e.target.classList.toggle(classes.Toggle);
  }
  
  toppingToggle = (e, side, amount) => {
    e.preventDefault();
    e.stopPropagation();
    let node = e.target.parentNode.parentNode;
    /* this.props.addTopping(this.props.toppingName, side, amount); */

    const stateAmount = this.state[amount];
    let updateToggle = Object.keys(stateAmount).map(stateSide => {
      if(stateSide === side) {
        if(amount === ToppingTypes.Regular) {
          this.setState({ 
            [ToppingTypes.Extra]: {
              ...this.state[ToppingTypes.Extra],
              [ToppingTypes[side]]: false,
              [ToppingTypes.Whole]: false
            }
          });
        } else if(amount === ToppingTypes.Extra) {
            if(side === ToppingTypes.Whole) {
              this.setState({ 
                [ToppingTypes.Regular]: {
                  [ToppingTypes.Left]: false,
                  [ToppingTypes.Whole]: false,
                  [ToppingTypes.Right]: false
                }
              });
            } else {
              this.setState({ 
                [ToppingTypes.Regular]: {
                  ...this.state[ToppingTypes.Regular],
                  [ToppingTypes[side]]: false
                }
              });
            }
        }
       
        return {[stateSide]: !stateAmount[stateSide]};
      } else {
        return {[stateSide]: false };
      }
    }).reduce((obj, item) => {
      return {...obj, ...item};
    },{});
    let reg = ToppingTypes.None;
    let extr = ToppingTypes.None;
    this.setState( {
      [amount]: updateToggle
    }, () => {
      for (let key in this.state[ToppingTypes.Regular]) {
        if (this.state[ToppingTypes.Regular][key]) {
          reg = key;
        }
      }
      for (let key in this.state[ToppingTypes.Extra]) {
        if (this.state[ToppingTypes.Extra][key]) {
          extr = key;
        }
      }
      
      if(reg === ToppingTypes.None && extr === ToppingTypes.None) {
        console.log('node = ', node);
        this.props.removeTopping(node, this.props.toppingType, this.props.toppingName);
      } else this.props.addTopping(this.props.toppingType, this.props.toppingName, reg, extr);
    });
  }

  toggleOn = (e) => {
    if(!this.props.toggled) {

      this.toppingToggle(e, ToppingTypes.Whole, ToppingTypes.Regular);
      this.props.clicked(e);
    }
  }

  toggleOff = (e) => {
    this.setState({
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

    this.props.removeTopping(e, this.props.toppingType, this.props.toppingName);
  }

  render() {
    
    const regular = this.state[ToppingTypes.Regular];
    const extra = this.state[ToppingTypes.Extra];
    const topping = this.props.toppingName;
    
    const controlsRegular = Object.keys(regular).map(reg => {
      return <BuildControl
        key={`${topping} + ${reg} + ${ToppingTypes.Regular}`}
        name={topping}
        amount={ToppingTypes.Regular}
        side={reg}
        class={reg}
        toggled={regular[reg]}
        clicked={this.toppingToggle}
      />
      
    });
    const controlsExtra = Object.keys(extra).map(ext => {
      return <BuildControl
        key={`${topping} + ${ext} + ${ToppingTypes.Extra}`}
        name={topping}
        amount={ToppingTypes.Extra}
        side={ext}
        label={ToppingTypes.Extra}
        class={ToppingTypes.Extra}
        toggled={extra[ext]}
        clicked={this.toppingToggle}
      />
    });

    let classlist = classes.BuildControls;
    classlist = this.props.toggled ? classlist : [classlist, classes.MousePointer].join(' ');
    const controls = (    
      <div id={this.props.toppingName} className={classlist}
        onClick={(e) => this.toggleOn(e)}>
        <div className={classes.LabelHeader}onClick={(e) => this.toggleOn(e)}>
          <div className={classes.Label}>{this.props.toppingName}</div>
          { this.props.toggled ? 
          <div className={classes.Checked} onClick={(e) => this.toggleOff(e)}>
            X
          </div> : null}
        
        </div>
        {this.props.toggled ? 
          <Auxhoc>
            <div className={classes.BuildControl}>{controlsRegular}</div>
            <div className={classes.BuildControl}>{controlsExtra}</div>
          </Auxhoc> : null}
      </div>    
    );
    return controls;
      
  };

    
}
  
export default BuildControls;