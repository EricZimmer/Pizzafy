import * as actionTypes from '../actions/ActionTypes';
import * as tTypes from '../../ToppingTypes';
import { updateObject } from '../utility';

const initialState = {
  [tTypes.Base]: {
    [tTypes.Crust]: {
      type: {},
      size: {}
    },
    [tTypes.Sauce]: {
      type: {},
      amount:{}
    },
    [tTypes.Cheese]: {
      amount: {}
    }
  },
  [tTypes.Toppings]: {
    [tTypes.Meats]: {},
    [tTypes.Veggies]: {}
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

const updatePrice = (state, action) => {
  const { toppingType, toppingName, amount } = action;
  /* Depending on the action sent in arguments, side either is the side to add (left/whole/right),
   or the side to remove from state.Toppings (because side is undefined on action.type = remove) */
  const side = action.side || state.Toppings[toppingType][toppingName][amount];
  const modifiers = state.Prices.Modifiers; 
  return state.Prices[toppingType] * modifiers[amount] * modifiers[side];
}


const updateToppingHandler = (state, action) => {
  const { toppingType, toppingName, amount } = action;
  let updatedTopping = {
    [toppingType]: {
      ...state.Toppings[toppingType],
      [toppingName]: {
        ...state.Toppings[toppingType][toppingName],
        [amount]: null
      }
    }
  };
  let updatedPrice = updatePrice(state, action);
  
  switch(action.type) {
    case actionTypes.ADD_TOPPING:
      updatedTopping[toppingType][toppingName][amount] = action.side;
      updatedPrice = state.totalPrice + updatedPrice;
      break;
    case actionTypes.REMOVE_TOPPING:
      updatedTopping[toppingType][toppingName][amount] = tTypes.None;
      updatedPrice = state.totalPrice - updatedPrice;
      break;
    default: return state;
  }
  return updateObject(state, {totalPrice: updatedPrice, Toppings: updatedTopping});
}



const clearToppingHandler = (state, action) => {
  const topping = state.Toppings[action.toppingType][action.toppingName];
  let regState = {}, extraState = {};
  // Check the current state to find existing toppings in Regular and Extra
  if (topping.Regular !== tTypes.None) { // If a topping is found in Regular, remove it
    regState = updateToppingHandler(state, {...action, amount: tTypes.Regular, type: actionTypes.REMOVE_TOPPING});
  }
  // Create a temporary modified state object based on the above check, or return original state if no Regular found
  const updatedToppingsReg = updateObject(state, regState);
  if (topping.Extra !== tTypes.None) { // If a topping is found in Extra, remove it
    extraState = updateToppingHandler(updatedToppingsReg, 
      {...action, amount: tTypes.Extra, type: actionTypes.REMOVE_TOPPING});
  }
  return updateObject(state, {...updatedToppingsReg, ...extraState});
}

const setToppings = (state, action) => {
  return updateObject(state, {
    [tTypes.Base]: {
      ...state.Base,
      ...action.Base
    },
    [tTypes.Toppings]: {
      ...state.Toppings,
      ...action.Toppings
    },
    totalPrice: 8,
    error: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOPPING: return updateToppingHandler(state, action);
    case actionTypes.REMOVE_TOPPING: return updateToppingHandler(state, action);
    case actionTypes.CLEAR_TOPPING: return clearToppingHandler(state, action);
    case actionTypes.SET_TOPPINGS: return setToppings(state, action);
    default: return state;
  }
};

export default reducer;