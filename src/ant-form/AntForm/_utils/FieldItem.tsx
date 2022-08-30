import React from 'react';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import { RowProps } from 'antd/es/grid';
import { isShown } from '../../_utils/helpers';
import FieldsGroup from '../FieldsGroup';
import Field from '../Field';
import { FieldType, isFormItem, isReactNode, FieldSchema, AntSchema } from '../types';

interface FieldItemProps {
  item: FieldSchema | AntSchema;
  errors: any;
  rowProps?: RowProps;
  readOnly?: boolean;
  key: string | number;
  fieldName?: string | number;
  fieldKey?: string | number;
  locale?: string;
}

// @ts-ignore
const FieldItem: React.FC<FieldItemProps> = props => {
  const {
    item,
    errors,
    rowProps = {},
    readOnly = false,
    locale,
    fieldKey,
    fieldName
  } = props;
  if (isArray(item)) {
    return (
      <FieldsGroup
        errors={errors}
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

export default FieldItem;
