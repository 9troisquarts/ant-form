// @ts-nocheck

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Space } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { RowProps } from 'antd/es/grid';
import flattenDeep from 'lodash/flattenDeep';
import omit from 'lodash/omit';
import React, { useEffect, useMemo, useState } from 'react';
import { extendInput } from './fields';
import './index.css';
import { AntSchema, Configuration, FieldType, isFormItem } from './types';
import FieldItem from './_utils/FieldItem';

import en from 'antd/lib/locale/en_GB';
import es from 'antd/lib/locale/es_ES';
import fr from 'antd/lib/locale/fr_FR';
import {
  castObjectFromSchema,
  reverseCastFromSchema,
  transformNestedErrorsToArray,
} from '../_utils/castAttributes';
import {
  assignProxyValue,
  extractDefaultConditionnedFields,
  extractProxyFields,
  fieldIsInactive,
} from '../_utils/helpers';
import { OnPlaceEditProvider } from './providers/onPlaceEdit';

const antLocale = {
  fr,
  en,
  es,
};

let config: Configuration = {
  submitText: 'Save',
  layout: 'horizontal',
  locale: 'fr',
  tooltipIcon: <InfoCircleOutlined />,
};

export type AntFormProps = {
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
  cancelText?: string;
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

const calculateInactiveFieldsFromConditions = (conditions, object) =>
  Object.keys(conditions).filter((fieldName) => !conditions[fieldName].condition(object));

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
  const conditions = useMemo(() => {
    const conditionalFields = extractDefaultConditionnedFields(schema, object);
    if (Object.keys(conditionalFields).length === 0) return undefined;
    return conditionalFields;
  }, []);
  const [inactiveItems, setInactiveItems] = useState<Array<string>>(
    conditions ? calculateInactiveFieldsFromConditions(conditions, object) : [],
  );

  const [form] = Form.useForm();

  const [editingField, setEditingField] = useState(undefined);

  useEffect(() => {
    form.setFieldsValue(castObjectFromSchema(object, schema) || {});
    setInactiveItems(conditions ? calculateInactiveFieldsFromConditions(conditions, object) : []);
  }, [object, schema]);

  const initialValues = castObjectFromSchema(initialValuesFromSchema(schema, object), schema);
  const proxyFields = extractProxyFields(schema);

  const onFinish = () => {
    if (onSubmit && !readOnly) {
      const values = form.getFieldsValue(true);
      onSubmit(
        reverseCastFromSchema(assignProxyValue(proxyFields, omit(values, inactiveItems)), schema),
      );
    }
  };

  const onValuesChange = (values: any) => {
    const allValues = form.getFieldsValue(true);
    const nextInactiveItems = conditions
      ? calculateInactiveFieldsFromConditions(
          conditions,
          reverseCastFromSchema(assignProxyValue(proxyFields, allValues), schema),
        )
      : [];
    if (conditions) setInactiveItems(nextInactiveItems);
    if (onChange && !readOnly) {
      onChange(
        reverseCastFromSchema(assignProxyValue(proxyFields, values), schema),
        reverseCastFromSchema(
          assignProxyValue(proxyFields, omit(allValues, nextInactiveItems)),
          schema,
        ),
      );
    }
  };

  if (!schema || schema.length === 0) return null;

  const errors = transformNestedErrorsToArray(props.errors);
  return (
    <ConfigProvider locale={language}>
      <OnPlaceEditProvider
        loading={loading}
        onplace={onplace}
        formObject={object}
        onFormSubmit={onSubmit}
        submitText={submitText}
        cancelText={cancelText}
        editingField={editingField}
        setEditingField={setEditingField}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          {...(onChange ? { onValuesChange } : {})}
          {...(config.formProps || {})}
          {...rest}
        >
          {schema.filter(fieldIsInactive(inactiveItems)).map((item, i) => (
            <FieldItem
              inactiveItems={inactiveItems}
              renderLabel={renderLabel}
              layout={rest.layout}
              item={item}
              errors={errors}
              readOnly={readOnly}
              locale={locale}
              config={config}
              key={i}
              rowProps={rowProps}
            />
          ))}
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
