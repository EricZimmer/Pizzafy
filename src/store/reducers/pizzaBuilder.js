import * as actionTypes from '../actions/ActionTypes';
import * as ToppingTypes from '../../INGREDIENTCONST';
import { updateObject } from '../utility';

const initialState = {
  [ToppingTypes.Toppings]: null,
  totalPrice: 8,
  error: false
};

const addToppingHandler = (state, action) => {
  const updatedTopping = {
    [action.toppingName]: {
      [ToppingTypes.Regular]: action.regular,
      [ToppingTypes.Extra]: action.extra
    }
  };
  return updateObject(state.Toppings[action.toppingType], updatedTopping);

};

const removeToppingHandler = (state, action) => {
  const updatedTopping = {
    [action.toppingName]: {
      [ToppingTypes.Regular]: ToppingTypes.None,
      [ToppingTypes.Extra]: ToppingTypes.None
    }
  };
  return updateObject(state.Toppings[action.toppingType], updatedTopping);
};

const setToppings = (state, action) => {
  return updateObject(state, {
    [ToppingTypes.Toppings]: {
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
    case actionTypes.SET_Toppings: return setToppings(state, action);
    default: return state;
  }
};

export default reducer;