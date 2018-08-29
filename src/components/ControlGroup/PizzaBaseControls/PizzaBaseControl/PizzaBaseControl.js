import React from 'react';
import * as tTypes from '../../../../ToppingTypes';
import classes from '../PizzaBaseControl/PizzaBaseControl.css';
import tcClasses from '../../ToppingControls/ToppingControls.css';
import Auxhoc from '../../../../hoc/Auxhoc';

const pizzaBaseControl = (props) => {

  const createCrust = (crust) => {
    const options = tTypes.Crust_Types.map(name => {
      return <option value={name}>{name}</option>;
    });
    const buttons = tTypes.Crust_Sizes.map(size => {
      return <button>{size}</button>
    });
    
    return <Auxhoc>
      <div className={classes.ToppingControl}>
        <select>
          {options}
        </select>
      </div>
      <div className={classes.ToppingControl}>
        {buttons}
      </div>

    </Auxhoc>
  }
  const createSauce = (sauce) => {
    const options = tTypes.Sauce_Types.map(name => {
      return <option value={name}>{name}</option>;
    });
    const buttons = tTypes.Base_Amounts.map(size => {
      return <button>{size}</button>
    });
    return <Auxhoc>
      <div className={classes.ToppingControl}>
        <select>
          {options}
        </select>
      </div>
      <div className={classes.ToppingControl}>
        {buttons}
      </div>
    </Auxhoc>
  }
  const createCheese = (cheese) => {
    const buttons = tTypes.Base_Amounts.map(size => {
      return <button>{size}</button>
    });
    return <Auxhoc>
      <div className={classes.ToppingControl}>
        {buttons}
      </div>
    </Auxhoc>
  }

  const createControl = () => {
    switch (props.element.name) {
      case tTypes.Crust: return createCrust(props.element);
      case tTypes.Sauce: return createSauce(props.element);
      case tTypes.Cheese: return createCheese(props.element);
      default: return 'null';
    }
  }
  let base = createControl();
  console.log(base);
  return (
    <div className={classes.ToppingControls}>
      <div className={tcClasses.LabelHeader}onClick={this.toggleOn}>
        <div className={tcClasses.Label}>{props.element.name}</div>      
      </div>
      {base}
      
    </div>
  );
}

export default pizzaBaseControl;