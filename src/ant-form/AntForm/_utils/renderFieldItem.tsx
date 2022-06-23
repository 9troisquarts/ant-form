import React from 'react';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import { RowProps } from 'antd/es/grid';
import { isShown } from './helpers';
import FieldsGroup from '../FieldsGroup';
import Field from '../Field';
import { FieldType, isFormItem, isReactNode, FieldSchema, AntSchema } from '../types';

export type RenderFieldItemOptions = {
  key: string | number;
  fieldName?: string | number;
  fieldKey?: string | number;
  rowProps?: RowProps;
  readOnly?: boolean;
  locale?: string;
};

const renderFieldItem = (
  item: FieldSchema | AntSchema,
  errors: any,
  { key, rowProps, fieldName, fieldKey, readOnly, locale }: RenderFieldItemOptions,
) => {
  if (isArray(item)) {
    return (
      <FieldsGroup
        errors={errors}
        key={key}
        fields={item as AntSchema}
        rowProps={rowProps}
        options={{
          fieldKey,
          fieldName,
          locale,
          readOnly,
        }}
      />
    );
  } else if (isReactNode(item)) {
    return item;
  } else if (isFormItem(item)) {
    const { errorKey, ...field } = item as FieldType;
    if (!isShown(item)) return null;
    return (
      <Field
        key={field.key || field.name}
        options={{
          fieldKey,
          fieldName,
          readOnly,
          locale,
        }}
        field={field}
        error={get(errors, errorKey || field.name, null)}
      />
    );
  }
  return <div />;
};

export default renderFieldItem;
