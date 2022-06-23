import { FieldType } from '../types';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

export const hasDefaultValue = (field: FieldType) => field.defaultValue;
export const isShown = (field: FieldType) => !field.hidden;

/* Return true if props does not change */
export const memoOnlyForKeys = (keys: string[]): any => (
  prev: any,
  next: any,
): boolean => {
  /* Return true if key is not equal, then some is break and return true */
  const equal = !keys.some(key => {
    if (get(prev, key) === get(next, key)) return false;
    return !isEqual(get(prev, key), get(next, key));
  });
  return equal;
};
