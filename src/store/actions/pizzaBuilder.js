import * as actionTypes from './ActionTypes';
import * as ToppingTypes from '../../ToppingTypes';


export const addTopping = (toppingType, toppingName, amount, side) => {
  return {
    type: actionTypes.ADD_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    amount: amount,
    side: side
  };
};

export const removeTopping = (toppingType, toppingName, amount, side) => {
  return {
    type: actionTypes.REMOVE_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    amount: amount,
    side: side
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
        [ToppingTypes.Regular]: ToppingTypes.None, 
        [ToppingTypes.Extra]: ToppingTypes.None
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
  const toppingsMeats = mapToppings(ToppingTypes.Toppings_Meats);
  const toppingsVeggies = mapToppings(ToppingTypes.Toppings_Veggies);
  //console.log(...toppingsVeggies);
  return {
    type: actionTypes.SET_TOPPINGS,
    [ToppingTypes.Toppings]: {
      [ToppingTypes.Meats]: {
        ...toppingsMeats
      },
      [ToppingTypes.Veggies]: {
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
    if (meats[key].Regular !== ToppingTypes.None) {
      
      objMeats[key] = {[ToppingTypes.Regular]: meats[key].Regular};
    }
    if(meats[key].Extra !== ToppingTypes.None) {
      objMeats[key] = {
        ...objMeats[key],
        [ToppingTypes.Extra]: meats[key].Extra
      }
    }
  }
  //console.log('obj', objMeats);
  return {
    type: actionTypes.COMPILE_TOPPINGS,
    meats: objMeats
  }
}