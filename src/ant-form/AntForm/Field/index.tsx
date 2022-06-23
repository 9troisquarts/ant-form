import React from 'react';
import { FieldItemType } from '../types';
import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import { Form, Col } from 'antd';
import fieldsType from '../fields';
import { memoOnlyForKeys } from '../_utils/helpers';

type FieldProps = {
  error?: string;
  field: FieldItemType;
  options?: {
    fieldKey?: string | number;
    fieldName?: string | number;
    readOnly?: boolean;
    locale?: string;
  };
};

export const Field: React.FC<FieldProps> = props => {
  const {
    error,
    options,
    field: {
      colProps,
      name,
      input: { type, inputProps, ...inputConfig } = { type: 'string' },
      ...formItemProps
    },
  } = props;

  const { fieldKey, readOnly = false, locale } = options || {};

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
    locale,
    name: name,
    config: otherConfig,
    error,
  };

  let formItem =
    type === 'list' ? (
      <Component
        {...componentSharedProps}
        {...formItemProps}
        errors={error}
        inputProps={inputProps}
      />
    ) : (
      <Form.Item
        name={!isNil(fieldKey) ? [fieldKey, name] : name}
        {...(!isNil(fieldKey) ? { fieldKey: [fieldKey, name] } : {})}
        {...formItemProps}
        {...(valuePropName ? { valuePropName } : {})}
        {...((showFormItemError === undefined || showFormItemError) &&
          error && {
            validateStatus: 'error',
            help: isArray(error) ? error[0] : error,
          })}
      >
        <Component {...componentSharedProps} {...inputProps} />
      </Form.Item>
    );

  if (colProps) {
    return <Col {...colProps}>{formItem}</Col>;
  }

  return formItem;
};

export default React.memo(Field, memoOnlyForKeys(['field', 'error', 'options.locale']));
