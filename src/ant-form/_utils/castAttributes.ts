// @ts-nocheck
import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import moment from 'moment';
import { AntSchema, FieldType, isFormItem } from '../AntForm/types';

export const castValue = (type: string, value) => {
  switch (type) {
    case 'daterange':
    case 'date':
      if (value) return value instanceof moment ? value : moment(value);
      break;
    case 'upload':
      return value || [];
  }
  return value;
};

export const castObjectFromSchema = (object: any, schema: AntSchema) => {
  const castedObject = {
    ...object,
  };
  flattenDeep(schema)
    .filter((f) => f)
    .filter(isFormItem)
    .filter((f: FieldType) => f.input)
    .forEach((field: FieldType) => {
      if (Array.isArray(field.name)) {
        const proxyName = field.name.join('/==');
        castedObject[proxyName] = field.name.reduce((acc, value) => {
          acc[value] = castValue(field.input.type, castedObject[value]);
          return acc;
        }, {});
      } else {
        castedObject[field.name] = castValue(field.input.type, get(castedObject, field.name));
      }
    });
  return castedObject;
};

export const reverseCastFromSchema = (object: any, schema: AntSchema, skipUndefined = false) => {
  const castedObject = {};
  flattenDeep(schema)
    .filter((f) => f)
    .filter(isFormItem)
    .filter((f: FieldType) => f.input)
    .forEach((field: FieldType) => {
      if (Array.isArray(field.name)) {
        const proxyName = field.name.join('/==');
        field.name.forEach((n) => {
          castedObject[n] = get(object, [proxyName, n], undefined);
        });
        delete castedObject[proxyName];
      } else {
        if (!skipUndefined || object[field.name]) set(castedObject, field.name, object[field.name]);
        if (field.proxy) {
          const v = field.proxy.path
            ? get(object[field.name] || {}, field.proxy.path, null)
            : object[field.name];
          if (!skipUndefined || v) set(castedObject, field.proxy.name, v);
        }
      }
    });
  return castedObject;
};

export const transformNestedErrorsToArray = (errors: any): object => {
  let nextErrors = { ...errors };
  const keys = Object.keys(nextErrors);
  keys.forEach((key) => {
    const found = key.match(/(.+)\[(\d+)\]\.(.+)/);
    if (found) {
      const [_k, attributeName, index, name] = found;
      if (!nextErrors[attributeName]) nextErrors[attributeName] = [];
      if (!nextErrors[attributeName][index]) nextErrors[attributeName][index] = {};
      nextErrors[attributeName][index][name] = nextErrors[key];
    }
  });
  return nextErrors;
};
