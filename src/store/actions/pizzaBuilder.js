import * as actionTypes from './ActionTypes';
import * as ToppingTypes from '../../INGREDIENTCONST';


export const addTopping = (toppingType, toppingName, regular, extra) => {
  return {
    type: actionTypes.ADD_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    regular: regular,
    extra: extra
  };
};

export const removeTopping = (toppingType, toppingName) => {
  return {
    type: actionTypes.REMOVE_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName
  };
};

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

export const setToppings = () => {
  const toppingsMeat = mapToppings(ToppingTypes.Toppings_Meat);
  const toppingsVeggies = mapToppings(ToppingTypes.Toppings_Veggies);
  console.log(...toppingsVeggies);
  return {
    type: actionTypes.SET_Toppings,
    [ToppingTypes.Toppings]: {
      [ToppingTypes.Meat]: {
        ...toppingsMeat
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