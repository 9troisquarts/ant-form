// @ts-nocheck

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Space } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { RowProps } from 'antd/es/grid';
import { flatten, get, isArray } from 'lodash';
import flattenDeep from 'lodash/flattenDeep';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { extendInput } from './fields';
import './index.css';
import { AntSchema, Configuration, FieldType, isFormItem } from './types';
import FieldItem from './_utils/FieldItem';

import en from 'antd/lib/locale/en_GB';
import es from 'antd/lib/locale/es_ES';
import fr from 'antd/lib/locale/fr_FR';
import { OnPlaceEditProvider } from './providers/onPlaceEdit';

const antLocale = {
  fr,
  en,
  es,
};

let config: Configuration = {
  onplace: false,
  submitText: 'Save',
  layout: 'horizontal',
  locale: 'fr',
  tooltipIcon: <InfoCircleOutlined />,
};

export type AntFormProps = {
  onplace?: boolean;
  actionsWrapperProps?: {
    style?: React.CSSProperties;
    className?: string;
  };
  renderLabel?: (label: string | React.ReactNode) => string | React.ReactNode | React.ReactNode[];
  className?: string;
  errors?: any;
  extraActions?: React.ReactNode;
  loading?: boolean;
  locale?: string;
  object: any;
  onChange?: (values: any, allValues: any) => void;
  onSubmit?: (values: any) => void;
  readOnly?: boolean;
  rowProps?: RowProps;
  schema: AntSchema;
  style?: React.CSSProperties;
  submitButtonProps?: ButtonProps;
  submitText?: string;
  layout?: 'vertical' | 'horizontal';
};

const initialValuesFromSchema = (schema: AntSchema, object: any) =>
  flattenDeep(schema)
    .filter((f) => f)
    .filter(isFormItem)
    //.filter(validForInitialValues)
    .reduce((acc: any, field: FieldType) => {
      if (!object || !field) return acc;
      if (object[field.name]) {
        acc[field.name] = object[field.name];
      } else if (field.defaultValue) {
        acc[field.name] = field.defaultValue;
      }
      return acc;
    }, {});

const assignProxyValue = (fields: AntSchema, values: any) => {
  if (fields.length === 0) return values;

  const nextValues = values;
  fields.forEach(({ name, proxy }: FieldType) => {
    const fieldValue = get(values, name);
    if (fieldValue !== undefined && proxy) {
      if (isArray(fieldValue)) {
        nextValues[proxy.name] = fieldValue
          .map((v) => (proxy.path ? get(v, proxy.path, null) : v))
          .filter((e) => e);
      } else {
        nextValues[proxy.name] = proxy.path ? get(fieldValue, proxy.path, null) : fieldValue;
      }
    }
  });
  return nextValues;
};

const castValue = (type: string, value) => {
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

const castObjectFromSchema = (object: any, schema: AntSchema) => {
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
        castedObject[field.name] = castValue(field.input.type, castedObject[field.name]);
      }
    });
  return castedObject;
};

const reverseCastFromSchema = (object: any, schema: AntSchema) => {
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
        field.name.forEach((n) => {
          castedObject[n] = get(object, [proxyName, n], undefined);
        });
        delete castedObject[proxyName];
      }
    });
  return castedObject;
};

const transformNestedErrorsToArray = (errors: any): object => {
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

export const AntForm: React.FC<AntFormProps> = (props) => {
  const {
    onplace = false,
    schema,
    locale = config.locale || 'en',
    object,
    loading,
    readOnly = false,
    actionsWrapperProps,
    submitButtonProps,
    extraActions = null,
    rowProps = {
      gutter: 16,
    },
    cancelText,
    submitText,
    onSubmit,
    renderLabel,
    onChange,
    ...rest
  } = props;

  const language = config.language ? antLocale[config.language] : undefined;

  const [form] = Form.useForm();

  const [editingField, setEditingField] = useState(undefined);
  const [editingFieldLoading, setEditingFieldLoading] = useState(false);

  moment.locale(locale);

  useEffect(() => {
    form.setFieldsValue(castObjectFromSchema(object, schema) || {});
  }, [object, schema]);

  const initialValues = castObjectFromSchema(initialValuesFromSchema(schema, object), schema);

  const proxyFields = flatten(schema).filter((field: FieldType) => field && field.proxy);

  const onFinish = (values: any) => {
    if (onSubmit && !readOnly)
      onSubmit(reverseCastFromSchema(assignProxyValue(proxyFields, values), schema));
  };

  const onValuesChange = (values: any, allValues: any) => {
    if (onChange && !readOnly)
      onChange(
        reverseCastFromSchema(assignProxyValue(proxyFields, values), schema),
        reverseCastFromSchema(assignProxyValue(proxyFields, allValues), schema),
      );
  };

  if (!schema || schema.length === 0) return null;

  const errors = transformNestedErrorsToArray(props.errors);

  return (
    <ConfigProvider locale={language}>
      <OnPlaceEditProvider
        onplace={onplace}
        formObject={object}
        onFormSubmit={onSubmit}
        submitText={submitText}
        cancelText={cancelText}
        editingField={editingField}
        setEditingField={setEditingField}
        editingFieldLoading={editingFieldLoading}
        setEditingFieldLoading={setEditingFieldLoading}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          {...(onChange ? { onValuesChange } : {})}
          {...(config.formProps || {})}
          {...rest}
        >
          <>
            {schema.map((item, i) => (
              <FieldItem
                key={i}
                renderLabel={renderLabel}
                layout={rest.layout}
                item={item}
                errors={errors}
                readOnly={readOnly}
                locale={locale}
                config={config}
                rowProps={rowProps}
              />
            ))}
          </>
          {(extraActions || onSubmit) && (!readOnly || (readOnly && extraActions)) && (
            <div {...(config.actionsWrapperProps || {})} {...(actionsWrapperProps || {})}>
              <Space>
                {extraActions ? extraActions : null}
                {onSubmit && !readOnly && (
                  <Button
                    {...(submitButtonProps || {})}
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                  >
                    {submitText || config.submitText || 'Save'}
                  </Button>
                )}
              </Space>
            </div>
          )}
        </Form>
      </OnPlaceEditProvider>
    </ConfigProvider>
  );
};

export const configure = (configuration: Configuration) => {
  config = { ...config, ...configuration };
  return config;
};

export const addInputType = extendInput;

export default AntForm;
