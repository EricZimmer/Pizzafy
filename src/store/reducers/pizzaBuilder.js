import * as actionTypes from '../actions/ActionTypes';
import * as ToppingTypes from '../../ToppingTypes';
import { updateObject } from '../utility';

const initialState = {
  [ToppingTypes.Toppings]: {
    [ToppingTypes.Meats] : {},
    [ToppingTypes.Veggies]: {}
  },
  Prices: {
    Meats: 0.4,
    Veggies: 0.3,
    Modifiers: {
      Left: 1,
      Right: 1,
      Whole: 2,
      Regular: 1,
      Extra: 2,
      None: 0
    }
  },
  totalPrice: 8,
  error: false
};

const PRICES = {
  
}

const addToppingHandler = (state, action) => {
  let price = state.totalPrice;
  const prices = state.Prices;
  const modifiers = state.Prices.Modifiers
  if (action.regular === ToppingTypes.Whole && action.extra !== ToppingTypes.None) {
    price += (prices[action.toppingType] * modifiers[action.regular]);
    price += (prices[action.toppingType] * modifiers[action.extra] * modifiers.Extra * 0.5);
  } else {
    price += (prices[action.toppingType] * modifiers[action.regular] * modifiers.Regular);
    price += (prices[action.toppingType] * modifiers[action.extra] * modifiers.Extra);
  }
  
    
  const updatedTopping = {
    
      [action.toppingType]: {
        ...state[ToppingTypes.Toppings][action.toppingType],
        [action.toppingName]: {
          [ToppingTypes.Regular]: action.regular,
          [ToppingTypes.Extra]: action.extra
        }
      }
    
  };
  const updatedState = {totalPrice: price, Toppings: updatedTopping};
  return updateObject(state, updatedState);

};

const removeToppingHandler = (state, action) => {
  const updatedTopping = {
    [ToppingTypes.Toppings]: {
      ...state[ToppingTypes.Toppings],
      [action.toppingType]: {
        ...state[ToppingTypes.Toppings][action.toppingType],
        [action.toppingName]: {
          [ToppingTypes.Regular]: ToppingTypes.None,
          [ToppingTypes.Extra]: ToppingTypes.None
        }
      }
    }
  };
 
  return updateObject(state, updatedTopping);
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
    case actionTypes.SET_TOPPINGS: return setToppings(state, action);
    default: return state;
  }
};

export default reducer;