// @ts-nocheck
import { RowProps } from 'antd/es/grid';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import React from 'react';
import { fieldIsInactive, isShown } from '../../_utils/helpers';
import Field from '../Field';
import FieldsGroup from '../FieldsGroup';
import { AntSchema, FieldSchema, FieldType, isFormItem, isReactNode } from '../types';

interface FieldItemProps {
  item: FieldSchema | AntSchema;
  errors: any;
  rowProps?: RowProps;
  readOnly?: boolean;
  config?: any;
  key: string | number;
  inactiveItems?: string[];
  fieldName?: string | number;
  fieldKey?: string | number;
  layout?: 'vertical' | 'horizontal';
  locale?: string;
  renderLabel?: (label: string | React.ReactNode) => string | React.ReactNode | React.ReactNode[];
}

// @ts-ignore
const FieldItem: React.FC<FieldItemProps> = (props) => {
  const {
    item,
    errors,
    config = {},
    rowProps = {},
    readOnly = false,
    locale,
    layout,
    fieldKey,
    fieldName,
    inactiveItems = [],
    renderLabel,
  } = props;

  if (isArray(item)) {
    if (
      item.length === 0 ||
      (inactiveItems.length > 0 &&
        (item as AntSchema).filter(fieldIsInactive(inactiveItems)).length === 0)
    )
      return null;
    return (
      <FieldsGroup
        layout={layout}
        inactiveItems={inactiveItems}
        config={config}
        errors={errors}
        renderLabel={renderLabel}
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
        layout={layout}
        config={config}
        key={field.key || field.name}
        options={{
          fieldKey,
          fieldName,
          readOnly,
          locale,
        }}
        field={field}
        renderLabel={renderLabel}
        error={get(errors, errorKey || field.name, null)}
      />
    );
  }
  return <div />;
};

export default FieldItem;
