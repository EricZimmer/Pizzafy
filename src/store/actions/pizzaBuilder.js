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
        [ToppingTypes.REGULAR]: ToppingTypes.NONE, 
        [ToppingTypes.EXTRA]: ToppingTypes.NONE
      }};
  }).reduce((obj, item) => {
    return {...obj, ...item};
  },{});
}

export const setToppings = () => {
  const toppingsMeat = mapToppings(ToppingTypes.TOPPINGS_MEAT);
  const toppingsVeggies = mapToppings(ToppingTypes.TOPPINGS_VEGGIES);
  console.log(...toppingsVeggies);
  return {
    type: actionTypes.SET_TOPPINGS,
    [ToppingTypes.TOPPINGS]: {
      [ToppingTypes.MEAT]: {
        ...toppingsMeat
      },
      [ToppingTypes.VEGGIES]: {
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