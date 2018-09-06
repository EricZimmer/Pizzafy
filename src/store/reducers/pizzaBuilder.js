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
  const Prices = state.Prices;
  const Modifiers = state.Prices.Modifiers; 
  if(action.type === actionTypes.ADD_TOPPING || action.type === actionTypes.REMOVE_TOPPING) {
    const { toppingType, toppingName, amount } = action;
    /* Depending on the action sent in arguments, side either is the side to add (left/whole/right),
    or the side to remove from state.Toppings (because side is undefined on action.type = remove) */
    const side = action.side || state.Toppings[toppingType][toppingName][amount];
    return state.Prices[toppingType] * Modifiers[amount] * Modifiers[side] * Modifiers[state[tTypes.Base].Crust.size];
  } 
  else if (action.type === actionTypes.UPDATE_PIZZA_BASE) {
    //remove current base element price and add the new element's price
    let priceChange = 0;
    if (action.baseElement.name === tTypes.Cheese && action.changedObj.key === 'amount') {
      priceChange -= Prices[state[tTypes.Base].Cheese.name] * Modifiers[state[tTypes.Base].Cheese.amount];
      priceChange += Prices[action.baseElement.name] * Modifiers[action.changedObj.value]
    }
    else if (action.baseElement.name === tTypes.Sauce && action.changedObj.key === 'amount') {
      priceChange -= Prices[state[tTypes.Base].Sauce.name] * Modifiers[state[tTypes.Base].Sauce.amount];
      priceChange += Prices[action.baseElement.name] * Modifiers[action.changedObj.value]
    }
    else if (action.baseElement.name === tTypes.Crust && action.changedObj.key === 'type') {
      priceChange -= Prices[state[tTypes.Base].Crust.type];
      priceChange += Prices[action.changedObj.value];
    }
    console.log(priceChange)
    return priceChange;
  }
}


const renderTotalPrice = (state) => {
  let updatedPrice = 0;
  const Prices = state.Prices;
  const Modifiers = Prices.Modifiers;
  const stBase = state[tTypes.Base];
  const stMeats = state.Toppings.Meats;

  updatedPrice += Prices[stBase.Crust.type] + Prices[stBase.Crust.size] + Modifiers[stBase.Sauce.amount] + Modifiers[stBase.Cheese.amount];
  
  for (let meat in stMeats) {
    if(stMeats[meat].Regular && stMeats[meat].Regular !== tTypes.None) {
      updatedPrice += Prices.Meats * Modifiers.Regular * Modifiers[stMeats[meat].Regular] * Modifiers[stBase.Crust.size];      
    }
    if(stMeats[meat].Extra && stMeats[meat].Extra !== tTypes.None) {
      updatedPrice += Prices.Meats * Modifiers.Extra * Modifiers[stMeats[meat].Extra] * Modifiers[stBase.Crust.size]; 
    }
  }
  return updatedPrice;
}

const updatePizzaBase = (state, action) => {
  const base = action.baseElement;
  const updatedElement = action.changedObj;
  let updatedPrice = 0;
  let updateBase = {
    
      ...state[tTypes.Base],
      [base.name]: {
        ...base,
        [updatedElement.key]: updatedElement.value
      }
    
  };
  const updatedState = updateObject(state, {[tTypes.Base]: updateBase});
  console.log(updatedState)
  if (updatedElement.key === 'size') updatedPrice = renderTotalPrice(updatedState);
  else updatedPrice = state.totalPrice + updatePrice(state, action);
  
  return updateObject(updatedState, {totalPrice: updatedPrice});
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
  /* const updatedState = updateObject(state, updatedTopping) */
  /* const updatedPrice = renderTotalPrice(updatedState) */
  console.log('updSt', updatedPrice)
  return updateObject(state, {totalPrice: updatedPrice, Toppings: updatedTopping});
}



const clearToppingHandler = (state, action) => {
  const topping = state.Toppings[action.toppingType][action.toppingName];
  let regState = {}, extraState = {};
  // Check the current state to find existing toppings in Regular and Extra
  if (topping.Regular !== undefined && topping.Regular !== tTypes.None) { // If a topping is found in Regular, remove it
    regState = updateToppingHandler(state, {...action, amount: tTypes.Regular, type: actionTypes.REMOVE_TOPPING});
  }
  // Create a temporary modified state object based on the above check, or return original state if no Regular found
  const updatedToppingsReg = updateObject(state, regState);
  if (topping.Extra !== undefined && topping.Extra !== tTypes.None) { // If a topping is found in Extra, remove it
    extraState = updateToppingHandler(updatedToppingsReg, 
      {...action, amount: tTypes.Extra, type: actionTypes.REMOVE_TOPPING});
  }
  return updateObject(state, {...updatedToppingsReg, ...extraState});
}


const initStateFromDB = (state, action) => {
  console.log(action.data)
  const Pizza = action.data.Pizza_Templates.Starter;
  const {Prices, Modifiers} = action.data.Prices;
  const initPrices = updateObject(state, {Prices: {...Prices, Modifiers: Modifiers}});
  console.log('tt' , tTypes.Crust_Types[`${Pizza.Crust.type}`])
  const initState = {
    
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
  const updatedState = updateObject(initPrices, initState);
  const updatedPrice = renderTotalPrice(updatedState);
  return updateObject(updatedState, {totalPrice: updatedPrice})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_APP: return initStateFromDB(state, action);
    case actionTypes.UPDATE_PIZZA_BASE: return updatePizzaBase(state, action);
    case actionTypes.ADD_TOPPING: return updateToppingHandler(state, action);
    case actionTypes.REMOVE_TOPPING: return updateToppingHandler(state, action);
    case actionTypes.CLEAR_TOPPING: return clearToppingHandler(state, action);
    //case actionTypes.SET_TOPPINGS: return setToppings(state, action);
    default: return state;
  }
};

export default reducer;