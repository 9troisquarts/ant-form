import React from 'react';
import { FieldItemType } from '../types';
import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import { Form, Col } from 'antd';
import fieldsType from '../fields';
import { memoOnlyForKeys } from '../../_utils/helpers';

type FieldProps = {
  error?: string;
  field: FieldItemType;
  layout?: 'horizontal' | 'vertical';
  options?: {
    fieldKey?: string | number;
    fieldName?: string | number;
    readOnly?: boolean;
    locale?: string;
  };
  renderLabel?: (label: string | React.ReactNode) => string | React.ReactNode | React.ReactNode[];
};

export const Field: React.FC<FieldProps> = props => {
  const {
    error,
    options,
    layout = "vertical",
    renderLabel,
    field: {
      colProps,
      name: n,
      input: { type, inputProps, ...inputConfig } = { type: 'string' },
      label,
      ...formItemProps
    },
  } = props;

  const { fieldKey, readOnly = false, locale } = options || {};

  let name = n;
  if (Array.isArray(name)) name = name.join('/==');

  if (!fieldsType[type]?.component)
    return (
      <div>Component of type {type} is not handle by your configuration</div>
    );
  const {
    component: Component,
    valuePropName,
    showFormItemError,
    ...otherConfig
  } = fieldsType[type];

  const componentSharedProps = {
    readOnly,
    ...inputConfig,
    layout,
    locale,
    name: n,
    config: otherConfig,
    error,
  };

  let formItem =
    type === 'list' ? (
      <Component
        {...componentSharedProps}
        {...formItemProps}
        label={label}
        errors={error}
        inputProps={inputProps}
      />
    ) : (
      <Form.Item
        name={!isNil(fieldKey) ? [fieldKey, name] : name}
        {...(!isNil(fieldKey) ? { fieldKey: [fieldKey, name] } : {})}
        {...formItemProps}
        className={`${formItemProps.className} ant-form-item-${type}`}
          {...(valuePropName ? { valuePropName } : {})}
          {...((showFormItemError === undefined || showFormItemError) &&
            error && {
              validateStatus: 'error',
              help: isArray(error) ? error[0] : error,
            })}
        {...(renderLabel ? ({ colon: false }) : {})}
        label={renderLabel && label ? renderLabel(label) : label}
      >
        <Component renderLabel={renderLabel} {...componentSharedProps} {...inputProps} inputProps={inputProps} />
      </Form.Item>
    );

  if (colProps) {
    return <Col {...colProps}>{formItem}</Col>;
  }

  return formItem;
};

export default React.memo(Field, memoOnlyForKeys(['field', 'error', 'options.locale']));
