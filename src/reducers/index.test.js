import _ from 'lodash';

import db from '../products.json';
import { chooseRandomKey } from '../helpers/generic';
import * as actions from '../actions';

import reducer, { initialState } from './index';

test('store is unchanged by empty action', () => {
  const state1 = reducer(initialState);
  const state2 = reducer(state1, {});
  expect(state1).toBe(state2);
});

function addRandomProductToState (state) {
  const productId = chooseRandomKey(db);
  const stateAfterAdd = reducer(state, actions.addProduct(productId));
  return {
    stateAfterAdd,
    productId
  };
}
describe('add product', () => {

  test('add product to state without errors', () => {
    const state1 = reducer(initialState);
    const { stateAfterAdd, productId } = addRandomProductToState(state1);
    expect(stateAfterAdd).toHaveProperty('cart');
  });
  
  const state1 = reducer(initialState);
  const { stateAfterAdd, productId } = addRandomProductToState(state1);
  const { products, meta } = stateAfterAdd.cart;

  test('creates meta object and product object with correct key', () => {
    expect(_.size(products)).toBe(1);
    expect(_.size(meta)).toBe(1);
    expect(products).toHaveProperty(productId);
    expect(meta).toHaveProperty(productId);
  });

  test('product was initalized correctly', () => {
    const productAdded = products[productId];
    expect(productAdded).toEqual(db[productId]); // check object values are deeply equal
    expect(productAdded).not.toBe(db[productId]); // should be different object identities

    const productMeta = meta[productId];
    expect(productMeta.quantity).toBe(1); // starts at quantity of 1
  });
});

test('removed products are not in state', () => {
  const state1 = reducer(initialState);
  const { stateAfterAdd, productId } = addRandomProductToState(state1);
  const stateAfterRemove = reducer(stateAfterAdd, actions.removeProduct(productId));
  const { products, meta } = stateAfterRemove.cart;

  expect(products).not.toHaveProperty(productId);
  expect(meta).not.toHaveProperty(productId);
});

test('can update quantity without changing product', () => {
  expect('todo').toBe('done');
});
