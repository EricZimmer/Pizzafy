import * as actionTypes from '../actions/ActionTypes';
import * as tTypes from '../../ToppingTypes';
import { updateObject } from '../utility';

const initialState = {
  [tTypes.Base]: {
    [tTypes.Crust]: {
      name: tTypes.Crust,
      type: null,
      size: {}
    },
    [tTypes.Sauce]: {
      name: tTypes.Sauce,
      type: {},
      amount:{}
    },
    [tTypes.Cheese]: {
      name: tTypes.Cheese,
      amount: {}
    }
  },
  [tTypes.Toppings]: {
    [tTypes.Meats]: {},
    [tTypes.Veggies]: {}
  },
  Prices: {
    /* Medium: 9,
    Large: 11,
    [tTypes.XLarge]: 13,
    [tTypes.Crust_HandTossed]: 0,
    [tTypes.Crust_Thin]: 0,
    [tTypes.Crust_Stuffed]: 2,
    Cheese: 1,
    Sauce: 0.3,
    Meats: 0.6,
    Veggies: 0.4,
    Modifiers: {
      Medium: 1,
      Large: 1.5,
      [tTypes.XLarge]: 1.75,
      Left: 1,
      Right: 1,
      Whole: 2,
      Light: 1,
      Regular: 1,
      Extra: 2,
      None: 0
    } */
  },
  totalPrice: 0,
  error: false
};

const updatePrice = (state, action) => {
  if(action.type === actionTypes.ADD_TOPPING || action.type === actionTypes.REMOVE_TOPPING) {
    const { toppingType, toppingName, amount } = action;
    /* Depending on the action sent in arguments, side either is the side to add (left/whole/right),
    or the side to remove from state.Toppings (because side is undefined on action.type = remove) */
    const side = action.side || state.Toppings[toppingType][toppingName][amount];
    const modifiers = state.Prices.Modifiers; 
    console.log('action', action)
    return state.Prices[toppingType] * modifiers[amount] * modifiers[side] * modifiers[state[tTypes.Base].Crust.size];
  } 
  else if (action.type === actionTypes.UPDATE_PIZZA_BASE) {
    let updatedPrice = 0;
    const stMeats = state.Toppings.Meats;
    for (let meat in stMeats) {
      if(stMeats[meat].Regular !== tTypes.None) {
        console.log('meats ', meat, 'reg', stMeats[meat].Regular)
        updatedPrice += updatePrice(state, {
          type: actionTypes.ADD_TOPPING, toppingType: tTypes.Meats, 
          toppingName: meat, amount: tTypes.Regular, side: stMeats[meat].Regular
          });
        console.log('reg udp', updatedPrice)
        }
      if(stMeats[meat].Extra !== tTypes.None) {
        updatedPrice += updatePrice(state, {
          type: actionTypes.ADD_TOPPING, toppingType: tTypes.Meats, 
          toppingName: meat, amount: tTypes.Extra, side: stMeats[meat].Extra
        });
        console.log('ext udp', updatedPrice)
      }
    }
    return updatedPrice;
  }
}

const updatePizzaBase = (state, action) => {
  let updatedBase = {
    
      ...state[tTypes.Base],
      [action.baseElement.name]: {
        ...action.baseElement,
        [action.changedObj.key]: action.changedObj.value
      }
    
  };
  let updatedPrice = updatePrice(state, action);
  console.log(updatedBase)
  return updateObject(state, {totalPrice: updatedPrice, [tTypes.Base]: updatedBase});
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
  let totalPrice = 0;
  const prices = state.Prices;
  const base = action[tTypes.Base];
  totalPrice += prices[base.Crust.size] + prices[base.Crust.type] +
    prices.Modifiers[base.Sauce.amount] + prices.Modifiers[base.Cheese.amount];
  return updateObject(state, {
    [tTypes.Base]: {
      ...state[tTypes.Base],
      ...action[tTypes.Base]
    },
    [tTypes.Toppings]: {
      ...state.Toppings,
      ...action.Toppings
    },
    totalPrice: totalPrice,
    error: false
  });
};

const initStateFromDB = (state, action) => {
  console.log(action.data)
  const Pizza = action.data.Pizza_Templates.Starter;
  const {Prices, Modifiers} = action.data.Prices;
  const initPrices = updateObject(state, {Prices: {...Prices, Modifiers: Modifiers}});
  console.log('tt' , tTypes.Crust_Types[`${Pizza.Crust.type}`])
  const initAction = {
    [tTypes.Base]: {
      [tTypes.Crust]: {...Pizza.Crust},
      [tTypes.Sauce]: {...Pizza.Sauce},
      [tTypes.Cheese]: {...Pizza.Cheese}
    },
    [tTypes.Toppings]: {
      [tTypes.Meats]: {...Pizza.Meats},
      [tTypes.Veggies]: {...Pizza.Veggies}
    }
  }
  const updatedState = setToppings(initPrices, initAction);
  return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_APP: return initStateFromDB(state, action);
    case actionTypes.UPDATE_PIZZA_BASE: return updatePizzaBase(state, action);
    case actionTypes.ADD_TOPPING: return updateToppingHandler(state, action);
    case actionTypes.REMOVE_TOPPING: return updateToppingHandler(state, action);
    case actionTypes.CLEAR_TOPPING: return clearToppingHandler(state, action);
    case actionTypes.SET_TOPPINGS: return setToppings(state, action);
    default: return state;
  }
};

export default reducer;