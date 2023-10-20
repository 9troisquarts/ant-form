import '@testing-library/jest-dom';
import { assignProxyValue } from './_utils/helpers';
import { AntSchema } from './AntForm/types';
import { reverseCastFromSchema } from './_utils/castAttributes';

type ObjectType = {
  scope?: {
    id: number;
  };
  scopes?: {
    id: number;
  }[];
  scopeId?: number;
  scopeIds?: number[];
};

const proxySchema: AntSchema<ObjectType> = [
  {
    name: 'scope',
    proxy: {
      name: 'scopeId',
      path: ['id'],
    },
    input: {
      type: 'string',
    },
  },
];

const arrayProxySchema: AntSchema<ObjectType> = [
  {
    name: 'scopes',
    proxy: {
      name: 'scopeIds',
      path: ['id'],
    },
    input: {
      type: 'string',
    },
  },
];

describe('reverseCastFromSchema', () => {
  it('copy origin fields in proxy if path is not defined', () => {
    const object: ObjectType = {
      scope: { id: 1 },
      scopeId: 1,
    };
    const schema: AntSchema<ObjectType> = [
      {
        name: 'scope',
        proxy: {
          name: 'scopeId',
        },
        input: {
          type: 'string',
        },
      },
    ];
    const nextObject = reverseCastFromSchema(object, schema);
    expect(nextObject.scopeId).toEqual({ id: 1 });
  });

  it('reverse simple proxy', () => {
    const object = {
      scope: { id: 1 },
      scopeId: 1,
    };
    const nextObject: any = reverseCastFromSchema(object, proxySchema);
    expect(nextObject.scopeId).toEqual(1);
  });

  it('reverse array proxy', () => {
    const object = {
      scopes: [{ id: 1 }, { id: 2 }],
      scopeIds: [1, 2],
    };
    const nextObject: any = reverseCastFromSchema(object, arrayProxySchema);
    expect(nextObject.scopeIds).toEqual([1, 2]);
  });
});

describe('assignProxyValue', () => {
  it('assign proxy value', () => {
    const object = {
      scope: { id: 1 },
    };
    const withProxy = assignProxyValue(proxySchema, object);
    expect(withProxy.scopeId).toEqual(1);
  });

  it('assign proxy values when values is an array', () => {
    const object = {
      scopes: [{ id: 1 }, { id: 2 }],
    };
    const withProxy = assignProxyValue(arrayProxySchema, object);
    expect(withProxy.scopeIds).toEqual([1, 2]);
  });
});
