import React from 'react';
import * as tTypes from '../../../../ToppingTypes';
import classes from '../PizzaBaseControl/PizzaBaseControl.css';
import cgClasses from '../../../ControlGroup/ControlGroup.css';
import Auxhoc from '../../../../hoc/Auxhoc';

const pizzaBaseControl = (props) => {

  const createCrust = (crust) => {
    const options = tTypes.Crust_Types.map(name => {
      return <option key={name} value={name}>{name}</option>;
    });
    const buttons = tTypes.Crust_Sizes.map(size => {
      console.log('bclass', crust.size === size)
      const buttonClass = size === crust.size ? [classes.Button, classes.ToggledOn].join(' '): classes.Button;
      return <button key={size} className={buttonClass}>{size}</button>
    });
    
    return <Auxhoc>
      <div className={classes.BaseControl}>
        <select>
          {options}
        </select>
      </div>
      <div className={classes.BaseControl}>
        {buttons}
      </div>

    </Auxhoc>
  }
  const createSauce = (sauce) => { 
    const options = tTypes.Sauce_Types.map(name => {
      return <option key={name} value={name}>{name}</option>;
    });
    const buttons = tTypes.Base_Amounts.map(amount => {
      const buttonClass = amount === sauce.amount ? [classes.Button, classes.ToggledOn].join(' '): classes.Button;
      return <button key={amount} className={buttonClass}>{amount}</button>
    });
    return <Auxhoc>
      <div className={classes.BaseControl}>
        <select>
          {options}
        </select>
      </div>
      <div className={classes.BaseControl}>
        {buttons}
      </div>
    </Auxhoc>
  }
  const createCheese = (cheese) => {
    const buttons = tTypes.Base_Amounts.map(size => {
      return <button key={size} className={classes.Button}>{size}</button>
    });
    return <Auxhoc>
      <div className={classes.BaseControl}>
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
    <div className={classes.BaseControls}>
      <div className={cgClasses.LabelHeader}onClick={this.toggleOn}>
        <div className={cgClasses.Label}>{props.element.name}</div>      
      </div>
      {base}
      
    </div>
  );
}

export default pizzaBaseControl;