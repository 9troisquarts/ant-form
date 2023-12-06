import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Form } from 'antd';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import { memoOnlyForKeys } from '../../_utils/helpers';
import fieldsType from '../fields';
import { FieldItemType } from '../types';

type FieldProps<T> = {
  error?: string;
  field: FieldItemType<T>;
  layout?: 'horizontal' | 'vertical';
  config?: any;
  options?: {
    fieldKey?: string | number;
    fieldName?: string | number;
    readOnly?: boolean;
    locale?: string;
  };
  renderLabel?: (
    label: string | React.ReactNode,
    args: { tooltip?: any },
  ) => string | React.ReactNode | React.ReactNode[];
};

export const Field: React.FC<FieldProps<any>> = (props) => {
  const {
    error,
    options,
    layout = 'vertical',
    config = {},
    renderLabel,
    field: {
      colProps,
      name: n,
      input: { type, inputProps, ...inputConfig } = { type: 'string' },
      label,
      tooltip,
      ...formItemProps
    },
  } = props;

  const { fieldKey, readOnly = false, locale } = options || {};

  let name = n;
  if (Array.isArray(name)) name = name.join('/==');

  if (!fieldsType[type]?.component)
    return <div>Component of type {type} is not handle by your configuration</div>;
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

  const tooltipProps = tooltip
    ? {
        title: tooltip,
        icon: config.tooltipIcon || <InfoCircleOutlined />,
      }
    : null;

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
      <span data-testid={`${name}`}>
        <Form.Item
          name={!isNil(fieldKey) ? [fieldKey, name] : name}
          {...(!isNil(fieldKey) ? { fieldKey: [fieldKey, name] } : {})}
          {...formItemProps}
          tooltip={renderLabel ? undefined : tooltipProps}
          className={`${formItemProps.className || ''} ant-form-item-${type}`}
          {...(valuePropName ? { valuePropName } : {})}
          {...((showFormItemError === undefined || showFormItemError) &&
            error && {
              validateStatus: 'error',
              help: isArray(error) ? error[0] : error,
            })}
          {...(renderLabel ? { colon: false } : {})}
          label={renderLabel && label ? renderLabel(label, { tooltip: tooltipProps }) : label}
        >
          <Component
            renderLabel={renderLabel}
            {...componentSharedProps}
            {...inputProps}
            inputProps={inputProps}
          />
        </Form.Item>
      </span>
    );

  if (colProps) {
    return <Col {...colProps}>{formItem}</Col>;
  }

  return formItem;
};

export default React.memo(
  Field,
  memoOnlyForKeys(['field', 'error', 'options.locale', 'options.readOnly']),
);
