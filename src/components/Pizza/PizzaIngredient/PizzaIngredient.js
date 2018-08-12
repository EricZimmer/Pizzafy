import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './PizzaIngredient.css';
import * as IngrTypes from '../../../INGREDIENTCONST';
import Auxhoc from '../../../hoc/Auxhoc';

import PEPPERONI_RIGHT from '../../../assets/pepright.svg';
import PEPPERONI_LEFT from '../../../assets/pepleft.svg';

import SAUSAGE_RIGHT from '../../../assets/sausageright.svg';
import SAUSAGE_LEFT from '../../../assets/sausageleft.svg';

const IMAGES = {
  'PEPPERONI_LEFT': PEPPERONI_LEFT, 'PEPPERONI_RIGHT': PEPPERONI_RIGHT,
  'SAUSAGE_LEFT': SAUSAGE_LEFT, 'SAUSAGE_RIGHT': SAUSAGE_RIGHT
};

const getImageRegular = (img, divclasses) => {
  return ( divclasses === null ? null : 
    <img className={divclasses} src={IMAGES[img]}/> );
};

const getImageExtra = (img, divclasses) => {
  return ( divclasses === null ? null : 
    <img className={divclasses} src={IMAGES[img]}/> );
};

class PizzaIngredient extends Component {

  createTopping = (topping, side, amount) => {
    const imgSrc = {
      [IngrTypes.LEFT]: [topping, IngrTypes.LEFT].join('_'),
      [IngrTypes.RIGHT]: [topping, IngrTypes.RIGHT].join('_')    
    };
    const divClasses = {
      regular: classes[topping],
      extra: [classes[topping], classes.rotate].join(' ')
    };

    let finishedTopping = {};

    if(side === IngrTypes.WHOLE) {
 
      if(amount === IngrTypes.REGULAR) {
        finishedTopping = (
          <Auxhoc>
            {getImageRegular(imgSrc.LEFT, divClasses.regular)}
            {getImageRegular(imgSrc.RIGHT, divClasses.regular)}
          </Auxhoc>
        );
      }
    } else {
        if(amount === IngrTypes.REGULAR) {
          finishedTopping = getImageRegular(imgSrc[side], divClasses.regular);
        } 
        else if (amount === IngrTypes.EXTRA) {
          finishedTopping = (
            <Auxhoc>
              {getImageRegular(imgSrc[side], divClasses.regular)}
              {getImageRegular(imgSrc[side], divClasses.extra)}
            </Auxhoc>
          );
        }
    }
          
          
    return finishedTopping;
  };
  
  render () {
      let ingredients = null;
      const side = this.props.side || null;
      const amount = this.props.amount || null;
      //console.log(amount, side);
      
      switch (this.props.topping) {
        case('crust'):
          ingredients = <div className={classes.Crust}>{this.props.children}</div>;
        break;
        case('crust-thin'):
          ingredients = <div className={classes.CrustThin}>{this.props.children}</div>;
        break;
        case('crust-regular'):
          ingredients = <div className={classes.CrustRegular}>{this.props.children}</div>;
        break;
        case('sauce'):
          ingredients = <div className={classes.Sauce}></div>;
        break;
        case('cheese'):
          ingredients = <div className={classes.Cheese}></div>;
        break;
        case('topping-container'):
          ingredients = <div className={classes.ToppingContainer}>{this.props.children}</div>;
        break;
        
        case(IngrTypes.PEPPERONI):
          if(side && side !== IngrTypes.NONE) {
            ingredients = this.createTopping(IngrTypes.PEPPERONI, side, amount);
          }
        break;
        case(IngrTypes.SAUSAGE):
          if(side && side  !== IngrTypes.NONE) {
            ingredients = this.createTopping(IngrTypes.SAUSAGE, side, amount);
          }
        break;
      default: ingredients = null;    
    }
    
    return ingredients;
  };
}

PizzaIngredient.propTypes = {
  name: PropTypes.string,
  topping: PropTypes.string
};

export default PizzaIngredient;

/* case('pepperoni-right'):
        ingredients = <img className={classes.Pepperoni} src={pepperoniR}/>;
        break;
      case('pepperoni-left'):
        ingredients = <img className={classes.Pepperoni} src={pepperoniL}/>;
        break;
      case('sausage-left'):
        ingredients = <img className={classes.Sausage} src={sausageL}/>;
        break;
      case('sausage-right'):
        ingredients = <img className={classes.Sausage} src={sausageR}/>;
        break;
      case('pepperoni-left-extra'):
        ingredients = (
          <div>
            <img className={[classes.Pepperoni, classes.rotate].join(' ')} src={pepperoniL} />
          </div>
        );
        break;
      case('pepperoni-right-extra'):
        ingredients = (
          <div>
            <img className={[classes.Pepperoni, classes.rotate].join(' ')} src={pepperoniR} />
          </div>
        );
        break;
      case('sausage-left-extra'):
        ingredients = (
          <div>
            <img className={[classes.Sausage, classes.rotate].join(' ')} src={sausageL} />
          </div>
        );
        break;
      case('sausage-right-extra'):
        ingredients = (
          <div>
            <img className={[classes.Sausage, classes.rotate].join(' ')} src={sausageR} />
          </div>
        );
        break;
    return ingredients;
  } */