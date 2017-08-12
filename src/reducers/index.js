import _ from 'lodash';

import * as types from '../types';
import db from '../products.json';

export const initialState = {
  cart: {
    products: {},
    meta: {}
  }
};

function generateProductMeta () {
  return {
    added: Date.now(),
    quantity: 1,
    comment: ""
  };
}

export function cartReducer(state = initialState, action = {}) {
  // action.payload = "<product-id>"
  const id = action.payload;
  let cart = state.cart;
  let products;
  let meta;

  switch (action.type) {
    case types.ADD_PRODUCT:
      console.info('cartReducer: Add product', action);
      // assumes product is not in cart already
      const newProduct = _.cloneDeep(db[id]); // product object must be a fresh js object
      products = _.assign({}, cart.products, {[id]: newProduct});
      meta = _.assign({}, cart.meta, {[id]: generateProductMeta()});
      cart = _.assign({}, cart, { products, meta });
      return { cart };

    case types.REMOVE_PRODUCT:
      console.info('cartReducer: Remove product', action);
      // assumes product is in the cart

      // create new object omitting product to be removed
      products = _.omitBy(cart.products, (value, key) => key === id);
      meta = _.omitBy(cart.meta, (value, key) => key === id);
      cart = _.assign({}, cart, { products, meta });
      return { cart };

    default:
      return state;
  }
}

const reducer = cartReducer // combineReducers({  });

export default reducer;
