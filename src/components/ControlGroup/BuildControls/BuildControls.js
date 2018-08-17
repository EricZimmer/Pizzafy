import React, { Component } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../../hoc/Auxhoc';
import * as IngrTypes from '../../../INGREDIENTCONST';

import BuildControl from './BuildControl/BuildControl';

class BuildControls extends Component {
  state = {
    
    [IngrTypes.REGULAR]: {
      [IngrTypes.LEFT]: false,
      [IngrTypes.WHOLE]: false,
      [IngrTypes.RIGHT]: false
    },
    [IngrTypes.EXTRA]: {
      [IngrTypes.LEFT]: false,
      [IngrTypes.WHOLE]: false,
      [IngrTypes.RIGHT]: false
    }
  }

  toggle = (e) => {
    e.preventDefault();
    e.target.classList.toggle(classes.Toggle);
  }
  
  componentDidUpdate() {
    //this.props.addTopping(this.props.topping, this.state);
    
  }
  componentWillUpdate() {
    
  }
  

  toppingToggle = (e, side, amount) => {
    e.preventDefault();
    /* this.props.addTopping(this.props.topping, side, amount); */

    const stateAmount = this.state[amount];
    let updateToggle = Object.keys(stateAmount).map(stateSide => {
      if(stateSide === side) {
        if(amount === IngrTypes.REGULAR) {
          this.setState({ 
            [IngrTypes.EXTRA]: {
              ...this.state[IngrTypes.EXTRA],
              [IngrTypes[side]]: false,
              [IngrTypes.WHOLE]: false
            }
          });
        } else if(amount === IngrTypes.EXTRA) {
            if(side === IngrTypes.WHOLE) {
              this.setState({ 
                [IngrTypes.REGULAR]: {
                  [IngrTypes.LEFT]: false,
                  [IngrTypes.WHOLE]: false,
                  [IngrTypes.RIGHT]: false
                }
              });
            } else {
              this.setState({ 
                [IngrTypes.REGULAR]: {
                  ...this.state[IngrTypes.REGULAR],
                  [IngrTypes[side]]: false
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
    this.setState({
      [amount]: updateToggle
    }, () => {
      let reg = IngrTypes.NONE;
      let extr = IngrTypes.NONE;
      for (let key in this.state.REGULAR) {
        if (this.state.REGULAR[key]) {
          reg = key;
        }
      }
      for (let key in this.state.EXTRA) {
        if (this.state.EXTRA[key]) {
          extr = key;
        }
      }
      this.props.addTopping(this.props.topping, reg, extr);
    });
    console.log('updatedtoggle= ', updateToggle);
    this.setState({
      pepperoni: [amount, side].join('__')
    });

    
    //this.props.addTopping(e, name, side, amount, toggle);
  }


  render() {
    
    const regular = this.state.REGULAR;
    const extra = this.state.EXTRA;
    const topping = this.props.topping;
    
    
    const controlsRegular = Object.keys(regular).map(reg => {
      return <BuildControl
        key={`${topping} + ${reg} + ${IngrTypes.REGULAR}`}
        name={topping}
        amount={IngrTypes.REGULAR}
        side={reg}
        class={reg}
        toggled={regular[reg]}
        clicked={this.toppingToggle}
      />
      
    });
    const controlsExtra = Object.keys(extra).map(ext => {
      return <BuildControl
        key={`${topping} + ${ext} + ${IngrTypes.EXTRA}`}
        name={topping}
        amount={IngrTypes.EXTRA}
        side={ext}
        label={IngrTypes.EXTRA}
        class={IngrTypes.EXTRA}
        toggled={extra[ext]}
        clicked={this.toppingToggle}
      />
    });

    const controls = (    
      <div id={this.props.topping} className={classes.BuildControls}
        onClick={(e) => this.props.clicked(e)}>
        <div className={classes.Label}>
          {this.props.topping}
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