import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './PizzaIngredient.css';
import * as IngrTypes from '../../../INGREDIENTCONST';

import PEPPERONI_RIGHT from '../../../assets/pepright.svg';
import PEPPERONI_LEFT from '../../../assets/pepleft.svg';
import PEPPERONI_WHOLE from '../../../assets/pepleft.svg';
import SAUSAGE_RIGHT from '../../../assets/sausageright.svg';
import SAUSAGE_LEFT from '../../../assets/sausageleft.svg';

const IMAGES = {
  'PEPPERONI_LEFT': PEPPERONI_LEFT, 'PEPPERONI_RIGHT': PEPPERONI_RIGHT,
  'SAUSAGE_LEFT': SAUSAGE_LEFT, 'SAUSAGE_RIGHT': SAUSAGE_RIGHT
};

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
      
      console.log('inside topping switch', this.props.topping);
    let ingredients = null;
    let imgSrc = null;
    let divClasses = [];
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
      /* case(ActionTypes.PEPPERONI): 
        switch(this.props.sideAndAmount) {
          case(ActionTypes.)
        } */
      case(IngrTypes.PEPPERONI):
        const side = this.props.side;
        const amount = this.props.amount;
        if(side != 'WHOLE' && amount === IngrTypes.REGULAR) {
          divClasses = classes[IngrTypes.PEPPERONI];
        } 
        else if (side != 'WHOLE' && amount === IngrTypes.EXTRA) {
          divClasses = [classes[IngrTypes.PEPPERONI], classes.rotate].join(' ');
        }
        
        imgSrc = [IngrTypes.PEPPERONI, this.props.side].join('_');
        console.log('divClasses = ', divClasses, ' src = ', imgSrc);
        ingredients = (
          <img className={divClasses} src={IMAGES[imgSrc]}/>
        );
        break;
      default: ingredients = null;
      
    }
    /* switch(this.props.topping) {
      case(IngrTypes.PEPPERONI):
        divClasses = classes[IngrTypes.PEPPERONI];
        imgSrc = [IngrTypes.PEPPERONI, this.props.side].join('_');
        console.log('divClasses = ', divClasses, ' src = ', imgSrc);
        ingredients = (
          <img className={divClasses} src={imgSrc}/>
        );
        break;
    default: ingredients = ingredients;

    } */
    
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