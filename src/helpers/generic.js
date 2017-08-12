import _ from 'lodash';

export function chooseRandomKey (db) {
  const keys = Object.keys(db);
  const randomKey = keys[_.random(0, keys.length - 1)];
  return randomKey;
}
