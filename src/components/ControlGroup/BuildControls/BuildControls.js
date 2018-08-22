import React, { PureComponent } from 'react';
import classes from './BuildControls.css';
import Auxhoc from '../../../hoc/Auxhoc';
import * as IngrTypes from '../../../INGREDIENTCONST';

import BuildControl from './BuildControl/BuildControl';

class BuildControls extends PureComponent {
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
    
    
  }
  componentWillUpdate() {
    
  }

  componentWillMount() {
    
  }
  

  toppingToggle = (e, side, amount) => {
    e.preventDefault();
    e.stopPropagation();
    let node = e.target.parentNode.parentNode;
    console.log('ee ', e.target.parentNode.parentNode);
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
    let reg = IngrTypes.NONE;
    let extr = IngrTypes.NONE;
    this.setState( {
      [amount]: updateToggle
    }, () => {
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
      if(reg === IngrTypes.NONE && extr === IngrTypes.NONE) {
        console.log('rem', node);
        this.props.toggleOff(node);
      }
    });
    console.log('reg ', reg, ' extr ', extr);
  }

  toggleOn = (e) => {
    if(!this.props.toggled) {

      this.toppingToggle(e, IngrTypes.WHOLE, IngrTypes.REGULAR);
      this.props.clicked(e);
    }
  }

  toggleOff = (e) => {
    this.setState({
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
    });
    this.props.clearTopping(e);
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

    let classlist = classes.BuildControls;
    classlist = this.props.toggled ? classlist : [classlist, classes.MousePointer].join(' ');
    const controls = (    
      <div id={this.props.topping} className={classlist}
        onClick={(e) => this.toggleOn(e)}>
        <div className={classes.LabelHeader}onClick={(e) => this.toggleOn(e)}>
          <div className={classes.Label}>{this.props.topping}</div>
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