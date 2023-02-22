import React from 'react';
import { AntSchema, FieldType } from '../types';
import some from 'lodash/some';
import { Input, Row } from 'antd';
import { RowProps } from 'antd/es/grid';
import FieldItem from '../_utils/FieldItem';

type FieldsGroupProps = {
  fields: AntSchema;
  errors: any;
  inactiveItems?: string[];
  layout?: 'horizontal' | 'vertical';
  config?: any;
  options?: {
    fieldKey?: string | number;
    fieldName?: string | number;
    readOnly?: boolean;
    locale?: string;
  };
  rowProps?: RowProps;
  renderLabel?: (label: string | React.ReactNode) => string | React.ReactNode | React.ReactNode[];
};

const FieldsGroup: React.FC<FieldsGroupProps> = props => {
  const { fields, inactiveItems = [], config = {}, errors, rowProps, layout = "horizontal", options = {}, renderLabel } = props;
  if (!fields) return null;
  const withRow = some(fields, field => (field as FieldType)?.colProps);

  const formItems = fields.map((item: any, i: number) => (
    <FieldItem
      layout={layout}
      inactiveItems={inactiveItems}
      config={config}
      item={item}
      renderLabel={renderLabel}
      errors={errors}
      rowProps={rowProps}
      key={i}
      {...(options || {})}
    />
  ));

  return (
    <Input.Group compact={!withRow}>
      {/* @ts-ignore */}
      {withRow ? <Row {...(rowProps || {})}>{formItems}</Row> : formItems}
    </Input.Group>
  );
};

export default FieldsGroup;
