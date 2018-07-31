import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './PizzaIngredient.css';

import pepperoniR from '../../../assets/pepright.svg';
import pepperoniL from '../../../assets/pepleft.svg';
import sausageL from '../../../assets/sausageleft.svg';
import sausageR from '../../../assets/sausageright.svg';

class PizzaIngredient extends Component {
  

  
  render () {
    //console.log(classes);
    /* const pepLeftClasses = Object.keys(pepperoni)
      .map(pep => {
        return [...Array(pepperoni[pep])]
      })
      .map(peps => {
        return <div key={peps} className={[classes.Pepperoni, peps].join(' ')} ></div>;
    }); */
    
    let ingredients = null;
    switch (this.props.type) {
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
      
      case('pepperoni-right'):
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
      case('pepperoni-extra-left'):
        ingredients = (
          <div>
            <img className={[classes.Pepperoni, classes.rotate].join(' ')} src={pepperoniL} />
          </div>
        );
        break;
      case('pepperoni-extra-right'):
        ingredients = (
          <div>
            <img className={[classes.Pepperoni, classes.rotate].join(' ')} src={pepperoniR} />
          </div>
        );
        break;
      case('sausage-extra-left'):
        ingredients = (
          <div>
            <img className={[classes.Sausage, classes.rotate].join(' ')} src={sausageL} />
          </div>
        );
        break;
      case('sausage-extra-right'):
        ingredients = (
          <div>
            <img className={[classes.Sausage, classes.rotate].join(' ')} src={sausageR} />
          </div>
        );
        break;
      default: ingredients = null;
    }

    return ingredients;
  }
}

PizzaIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default PizzaIngredient;