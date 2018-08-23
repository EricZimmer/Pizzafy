import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './PizzaIngredient.css';
import * as ToppingTypes from '../../../INGREDIENTCONST';
import Auxhoc from '../../../hoc/Auxhoc';

import Pepperoni_Right from '../../../assets/pepright.svg';
import Pepperoni_Left from '../../../assets/pepleft.svg';

import Sausage_Right from '../../../assets/sausageright.svg';
import Sausage_Left from '../../../assets/sausageleft.svg';

const IMAGES = {
  'Pepperoni_Left': Pepperoni_Left, 'Pepperoni_Right': Pepperoni_Right,
  'Sausage_Left': Sausage_Left, 'Sausage_Right': Sausage_Right
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
      [ToppingTypes.Left]: [topping, ToppingTypes.Left].join('_'),
      [ToppingTypes.Right]: [topping, ToppingTypes.Right].join('_')    
    };
    const divClasses = {
      regular: classes[topping],
      extra: [classes[topping], classes.rotate].join(' ')
    };

    let finishedTopping = {};

    if(side === ToppingTypes.Whole) {
 
      if(amount === ToppingTypes.Regular) {
        finishedTopping = (
          <Auxhoc>
            {getImageRegular(imgSrc.Left, divClasses.regular)}
            {getImageRegular(imgSrc.Right, divClasses.regular)}
          </Auxhoc>
        );
      } else if (amount === ToppingTypes.Extra) {
        finishedTopping = (
          <Auxhoc>
            {getImageRegular(imgSrc.Left, divClasses.regular)}
            {getImageRegular(imgSrc.Right, divClasses.regular)}
            {getImageRegular(imgSrc.Left, divClasses.extra)}
            {getImageRegular(imgSrc.Right, divClasses.extra)}
          </Auxhoc>
        );
      }
    } else {
        if(amount === ToppingTypes.Regular) {
          finishedTopping = getImageRegular(imgSrc[side], divClasses.regular);
        } 
        else if (amount === ToppingTypes.Extra) {
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
        case('Crust'):
          ingredients = <div className={classes.Crust}>{this.props.children}</div>;
        break;
        case('Crust-thin'):
          ingredients = <div className={classes.CrustThin}>{this.props.children}</div>;
        break;
        case('Crust-regular'):
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
        
        case(ToppingTypes.Pepperoni):
          if(side && side !== ToppingTypes.None) {
            ingredients = this.createTopping(ToppingTypes.Pepperoni, side, amount);
          }
        break;
        case(ToppingTypes.Sausage):
          if(side && side  !== ToppingTypes.None) {
            ingredients = this.createTopping(ToppingTypes.Sausage, side, amount);
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
      case('pepperoni-Left'):
        ingredients = <img className={classes.Pepperoni} src={pepperoniL}/>;
        break;
      case('Sausage-Left'):
        ingredients = <img className={classes.Sausage} src={SausageL}/>;
        break;
      case('Sausage-right'):
        ingredients = <img className={classes.Sausage} src={SausageR}/>;
        break;
      case('pepperoni-Left-extra'):
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
      case('Sausage-Left-extra'):
        ingredients = (
          <div>
            <img className={[classes.Sausage, classes.rotate].join(' ')} src={SausageL} />
          </div>
        );
        break;
      case('Sausage-right-extra'):
        ingredients = (
          <div>
            <img className={[classes.Sausage, classes.rotate].join(' ')} src={SausageR} />
          </div>
        );
        break;
    return ingredients;
  } */