import * as types from './types';

export const addEntry = (id) => ({ 
  type: types.ADD_ENTRY,
  payload: id
});

export const removeEntry = (id) => ({ 
  type: types.REMOVE_ENTRY,
  payload: id
});
