import * as actionTypes from './ActionTypes';
import * as tTypes from '../../ToppingTypes';


export const addTopping = (toppingType, toppingName, amount, side) => {
  return {
    type: actionTypes.ADD_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    amount: amount,
    side: side
  };
};

export const removeTopping = (toppingType, toppingName, amount) => {
  return {
    type: actionTypes.REMOVE_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    amount: amount
  };
};

export const clearTopping = (toppingType, toppingName) => {
  return {
    type: actionTypes.CLEAR_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName
  }
}

const mapToppings = (toppingType) => {
  return toppingType.map(topping => {
    return {
      [topping]: {
        [tTypes.Regular]: tTypes.None, 
        [tTypes.Extra]: tTypes.None
      }};
  }).reduce((obj, item) => {
    return {...obj, ...item};
  },{});
}
export const updatePrice = () => {
  return {
    type: actionTypes.UPDATE_PRICE
  }
}
export const updateTopping = (toppingType, toppingName, regular, extra) => {
  return dispatch => {
    dispatch(addTopping(toppingType, toppingName, regular, extra))
    return dispatch(updatePrice())
  };
}

export const setToppings = () => {
  const toppingsMeats = mapToppings(tTypes.Toppings_Meats);
  const toppingsVeggies = mapToppings(tTypes.Toppings_Veggies);
  //console.log(...toppingsVeggies);
  return {
    type: actionTypes.SET_TOPPINGS,
    [tTypes.Base]: {
      [tTypes.Crust]: {
        type: tTypes.HandTossed,
        size: tTypes.Large
      },
      [tTypes.Sauce]: {
        type: tTypes.Sauce_Classic,
        amount: tTypes.Regular
      },
      [tTypes.Cheese]: {
        amount: tTypes.Regular
      }
    },
    [tTypes.Toppings]: {
      [tTypes.Meats]: {
        ...toppingsMeats
      },
      [tTypes.Veggies]: {
        ...toppingsVeggies
      }
    }
  };
};

export const initToppings = () => {
  return dispatch => {
    dispatch(setToppings());
  }
}

export const compileToppings = (toppings) => {
  const meats = toppings.Meats;
  const veggies = toppings.Veggies;
  let objMeats = {}
  for ( let key in meats) {
    if (meats[key].Regular !== tTypes.None) {
      
      objMeats[key] = {[tTypes.Regular]: meats[key].Regular};
    }
    if(meats[key].Extra !== tTypes.None) {
      objMeats[key] = {
        ...objMeats[key],
        [tTypes.Extra]: meats[key].Extra
      }
    }
  }
  //console.log('obj', objMeats);
  return {
    type: actionTypes.COMPILE_TOPPINGS,
    meats: objMeats
  }
}