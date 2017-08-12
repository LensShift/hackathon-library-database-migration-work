import * as types from './types';

export const addProduct = (id) => ({ 
  type: types.ADD_PRODUCT,
  payload: id
});

export const removeProduct = (id) => ({ 
  type: types.REMOVE_PRODUCT,
  payload: id
});
