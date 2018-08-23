import * as actionTypes from '../actions/ActionTypes';
import * as ToppingTypes from '../../INGREDIENTCONST';
import { updateObject } from '../utility';

const initialState = {
  [ToppingTypes.TOPPINGS]: null,
  totalPrice: 8,
  error: false
};

const addToppingHandler = (state, action) => {
  const updatedTopping = {
    [action.toppingName]: {
      [ToppingTypes.REGULAR]: action.regular,
      [ToppingTypes.EXTRA]: action.extra
    }
  };
  return updateObject(state.TOPPINGS[action.toppingType], updatedTopping);

};

const removeToppingHandler = (state, action) => {
  const updatedTopping = {
    [action.toppingName]: {
      [ToppingTypes.REGULAR]: ToppingTypes.NONE,
      [ToppingTypes.EXTRA]: ToppingTypes.NONE
    }
  };
  return updateObject(state.TOPPINGS[action.toppingType], updatedTopping);
};

const setToppings = (state, action) => {
  console.log('actionT = ', action.Toppings);
  return updateObject(state, {
    [ToppingTypes.TOPPINGS]: {
      ...state.Toppings,
      ...action.Toppings
    },
    totalPrice: 8,
    error: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOPPING: return addToppingHandler(state, action);
    case actionTypes.REMOVE_TOPPING: return removeToppingHandler(state, action);
    case actionTypes.SET_TOPPINGS: 
      console.log('lol');
      return setToppings(state, action);
    default: return state;
  }
};

export default reducer;