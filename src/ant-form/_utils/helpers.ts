// @ts-nocheck
import { AntSchema, FieldItemType, FieldType } from '../AntForm/types';
import isEqual from 'lodash/isEqual';
import flattenDeep from 'lodash/flattenDeep';
import isArray from 'lodash/isArray';
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

export const extractProxyFields = (schema: AntSchema) => flattenDeep(schema).filter((field: FieldItemType) => field && field.proxy);

export const conditionnedFields = (schema: AntSchema) => flattenDeep(schema).filter(field => field && field.name && !!field?.condition);

export const extractDefaultConditionnedFields = (schema: AntSchema, object: any) => conditionnedFields(schema).reduce((acc, field) => {
  acc[field.name] = {
    condition: field.condition
  }
  return acc;
}, {});

export const fieldIsInactive = (inactiveFields) => (item: FieldItemType) => !item?.name || !inactiveFields.includes(item.name)

export const assignProxyValue = (fields: AntSchema, values: any) => {
  if (fields.length === 0) return values;

  const nextValues = values;
  fields.forEach(({ name, proxy }: FieldType) => {
    const fieldValue = get(values, name);
    if (fieldValue !== undefined && proxy) {
      if (isArray(fieldValue)) {
        nextValues[proxy.name] = fieldValue
          .map(v => proxy.path ? get(v, proxy.path, null) : v)
          .filter(e => e);
      } else {
        nextValues[proxy.name] = proxy.path ? get(fieldValue, proxy.path, null) : fieldValue;
      }
    }
  });
  return nextValues;
};

export const nameSeparator = '/==';
