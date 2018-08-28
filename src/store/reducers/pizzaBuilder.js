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

const updatePrice = (state, action) => {
  let price = state.totalPrice;
  /* const prices = state.Prices;
  const modifiers = state.Prices.Modifiers; 
  const steTopReg = modifiers[state.Toppings[action.toppingType][action.toppingName].Regular];
  const steTopExt = modifiers[state.Toppings[action.toppingType][action.toppingName].Extra];
  const actTopReg = modifiers[action.regular];
  const actTopExt = modifiers[action.extra];
  console.log('sttop ', steTopReg, steTopExt, 'act top ', actTopReg, actTopExt);
  if(actTopReg > steTopReg) {
    if(actTopReg === 2 && steTopReg === 1) price -= prices[action.toppingType] * modifiers.Regular;
    price += (prices[action.toppingType] * modifiers[action.regular] * modifiers.Regular);
    
  } else if (actTopExt > steTopExt) {
    if(actTopExt === 2 && steTopExt === 1) price -= prices[action.toppingType] * modifiers.Extra;
    price += (prices[action.toppingType] * modifiers[action.extra] * modifiers.Extra);
  }
  
  if (actTopReg < steTopReg){
    price -= (prices[action.toppingType] * modifiers.Regular);
    
  } else if (actTopExt < steTopExt) {
    console.log('here')
    price -= (prices[action.toppingType]  * modifiers.Extra);
  } */
  //console.log('price', price);
  return price;
}

const newPrice = (state) => {
  //console.log('run')
}

const updateToppingHandler = (state, action) => {
  const updatedPrice = updatePrice(state, action);
  let updatedTopping = {};

  switch(action.type) {
    case actionTypes.ADD_TOPPING:
      updatedTopping = {
        [action.toppingType]: {
        ...state[ToppingTypes.Toppings][action.toppingType],
        [action.toppingName]: {
          [ToppingTypes.Regular]: action.regular,
          [ToppingTypes.Extra]: action.extra
        }
      }};
      break;
    case actionTypes.REMOVE_TOPPING:
      updatedTopping = {
        [action.toppingType]: {
        ...state[ToppingTypes.Toppings][action.toppingType],
        [action.toppingName]: {
          [ToppingTypes.Regular]: action.None,
          [ToppingTypes.Extra]: action.None
        }
      }};
      break;
    default: return null;
  }

  const updatedState = {totalPrice: updatedPrice, Toppings: updatedTopping};
  return updateObject(state, updatedState);
}

const addToppingHandler = (state, action) => {
  /* let price = state.totalPrice;
  const prices = state.Prices;
  const modifiers = state.Prices.Modifiers;
  if (action.regular === ToppingTypes.Whole && action.extra !== ToppingTypes.None) {
    price += (prices[action.toppingType] * modifiers[action.regular]);
    price += (prices[action.toppingType] * modifiers[action.extra] * modifiers.Extra * 0.5);
  } else {
    price += (prices[action.toppingType] * modifiers[action.regular] * modifiers.Regular);
    price += (prices[action.toppingType] * modifiers[action.extra] * modifiers.Extra);
  } */
  
    
  const updatedTopping = {
    
      [action.toppingType]: {
        ...state.Toppings[action.toppingType],
        [action.toppingName]: {
          ...state.Toppings[action.toppingType][action.toppingName],
          [action.amount]: action.side
        }
      }
    
  };
  /* const updatedState = {totalPrice: price, Toppings: updatedTopping}; */
  return updateObject(state, {Toppings: updatedTopping});

};

const removeToppingHandler = (state, action) => {
  console.log(' amount ', action.amount)
  const updatedTopping = {
    
    [action.toppingType]: {
      ...state.Toppings[action.toppingType],
      [action.toppingName]: {
        ...state.Toppings[action.toppingType][action.toppingName],
        [action.amount]: ToppingTypes.None
      }
    }
  
};
/* const updatedState = {totalPrice: price, Toppings: updatedTopping}; */
return updateObject(state, {Toppings: updatedTopping});
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
    case actionTypes.UPDATE_PRICE: return newPrice(state);
    default: return state;
  }
};

export default reducer;