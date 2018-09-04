import * as actionTypes from './ActionTypes';
import * as tTypes from '../../ToppingTypes';
import axios from '../../axios-config';

const initAppFromDb = (dbData) => {
  return {
    type: actionTypes.INIT_APP,
    data: {...dbData}
  }
}

export const initApp = (database) => {
  return async dispatch => {
    try {
      let dbData = {'Pizza_Templates': {}, 'Prices': {}};
      let pizzaData = await database.collection('Pizza_Templates').get();
      let pricedata = await database.collection('Prices').get();

      pizzaData.forEach(doc => dbData.Pizza_Templates = {...dbData.Pizza_Templates, [doc.id]: doc.data()});
      pricedata.forEach(doc => dbData.Prices = {...dbData.Prices, [doc.id]: doc.data()});
      return dispatch(initAppFromDb(dbData));
    } catch(error) {
      console.log('initApp error: ', error)
    }
  }
}

export const updatePizzaBase = (baseElement, changedObj) => {
  return {
    type: actionTypes.UPDATE_PIZZA_BASE,
    baseElement: {...baseElement},
    changedObj: changedObj
  }
}

export const addTopping = (toppingType, toppingName, amount, side) => {
  return {
    type: actionTypes.ADD_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    amount: amount,
    side: side
  };
};

export const removeTopping = (toppingType, toppingName, amount) => {
  return {
    type: actionTypes.REMOVE_TOPPING,
    toppingType: toppingType,
    toppingName: toppingName,
    amount: amount
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
        [tTypes.Regular]: tTypes.None, 
        [tTypes.Extra]: tTypes.None
      }};
  }).reduce((obj, item) => {
    return {...obj, ...item};
  },{});
}


export const setToppings = () => {
  const toppingsMeats = mapToppings(tTypes.Toppings_Meats);
  const toppingsVeggies = mapToppings(tTypes.Toppings_Veggies);
  //console.log(...toppingsVeggies);
  return {
    type: actionTypes.SET_TOPPINGS,
    [tTypes.Base]: {
      [tTypes.Crust]: {
        name: tTypes.Crust,
        type: tTypes.Crust_Thin,
        size: tTypes.Large
      },
      [tTypes.Sauce]: {
        name: tTypes.Sauce,
        type: tTypes.Sauce_Classic,
        amount: tTypes.Regular
      },
      [tTypes.Cheese]: {
        name: tTypes.Cheese,
        amount: tTypes.Regular
      }
    },
    [tTypes.Toppings]: {
      [tTypes.Meats]: {
        ...toppingsMeats
      },
      [tTypes.Veggies]: {
        ...toppingsVeggies
      }
    }
  };
};

export const initToppings = () => {
  return dispatch => {
    dispatch(setToppings());
    /* axios.get('/Basic/Base.json')
      .then(response => {
        console.log('res', response)
      })
      .catch(error => {
        console.log('initToppings error', error)
      }); */
  }
}

/* export const compileToppings = (toppings) => {
  const meats = toppings.Meats;
  const veggies = toppings.Veggies;
  let objMeats = {}
  for ( let key in meats) {
    if (meats[key].Regular !== tTypes.None) {
      
      objMeats[key] = {[tTypes.Regular]: meats[key].Regular};
    }
    if(meats[key].Extra !== tTypes.None) {
      objMeats[key] = {
        ...objMeats[key],
        [tTypes.Extra]: meats[key].Extra
      }
    }
  }
  //console.log('obj', objMeats);
  return {
    type: actionTypes.COMPILE_TOPPINGS,
    meats: objMeats
  }
} */