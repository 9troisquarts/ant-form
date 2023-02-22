import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form } from 'antd';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import React, { useContext } from 'react';
import { memoOnlyForKeys } from '../../_utils/helpers';
import fieldsType from '../fields';
import { OnPlaceEditContext } from '../providers/onPlaceEdit';
import { FieldItemType } from '../types';
import './index.css';

type FieldProps = {
  error?: string;
  field: FieldItemType;
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

export const Field: React.FC<FieldProps> = (props) => {
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

  const {
    editingField,
    setEditingField,
    editingFieldLoading,
    setEditingFieldLoading,
    onplace,
    formObject,
    onFormSubmit,
    submitText = 'Ok',
    cancelText = 'Cancel',
  } = useContext(OnPlaceEditContext);

  const { fieldKey, readOnly = false, locale } = options || {};

  let name = n;
  if (Array.isArray(name)) {
    name = name.join('/==');
  }

  if (!fieldsType[type]?.component) {
    return <div>Component of type {type} is not handle by your configuration</div>;
  }

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

  let formItem = null;

  const onFieldSubmit = () => {
    setEditingFieldLoading(true);
    onFormSubmit()?.then(() => {
      setEditingFieldLoading(false);
      setEditingField(undefined);
    });
  };

  const onFieldCancel = () => {
    setEditingFieldLoading(false);
    setEditingField(undefined);
  };

  const getBaseFormItem = () => {
    return type === 'list' ? (
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
        tooltip={renderLabel ? undefined : tooltipProps}
        className={`${formItemProps.className} ant-form-item-${type}`}
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
    );
  };

  if (!onplace) {
    formItem = getBaseFormItem();
  } else {
    if (editingField === name) {
      formItem = (
        <div>
          {getBaseFormItem()}
          {editingField === name && (
            <div className="ant-form-on-place-edit-field-actions">
              <Button
                type="primary"
                onClick={onFieldSubmit}
                loading={editingFieldLoading}
                disabled={editingFieldLoading}
              >
                {submitText}
              </Button>
              <Button onClick={onFieldCancel} disabled={editingFieldLoading}>
                {cancelText}
              </Button>
            </div>
          )}
        </div>
      );
    } else {
      let fieldValue = '-';
      if (formObject?.hasOwnProperty(name) && formObject[name].toString().trim() !== '') {
        fieldValue = formObject[name];
      }
      formItem = (
        <div
          className={
            layout === 'horizontal'
              ? 'ant-form-on-place-edit-field-horizontal'
              : 'ant-form-on-place-edit-field-vertical'
          }
          onClick={() => setEditingField(name)}
        >
          <div>
            {renderLabel && label ? (
              renderLabel(label, { tooltip: tooltipProps })
            ) : (
              <div className="ant-form-on-place-edit-field-label">{`${label}`}</div>
            )}
          </div>
          <div className="ant-form-on-place-edit-field-value">{fieldValue}</div>
        </div>
      );
    }
  }

  if (colProps) {
    return <Col {...colProps}>{formItem}</Col>;
  }
  return formItem;
};

export default React.memo(Field, memoOnlyForKeys(['field', 'error', 'options.locale']));
