import React from 'react';
import { InputNumberProps } from 'antd/es/input-number';
import { InputProps, PasswordProps, TextAreaProps } from 'antd/es/input';
import { FormProps } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { SelectProps } from 'antd/es/select';
import { SliderSingleProps, SliderRangeProps } from 'antd/es/slider';
import { AutoCompleteProps } from 'antd/es/auto-complete';
import { DatePickerProps } from 'antd/es/date-picker';
import { ColProps } from 'antd/es/grid';
import { RateProps } from 'antd/es/rate';
import { CheckboxProps, CheckboxGroupProps } from 'antd/es/checkbox';
import { UploadProps } from 'antd/es/upload';
import { RadioGroupProps } from 'antd/es/radio';
import { SwitchProps } from 'antd/es/switch';
import { ButtonProps } from 'antd/es/button';
import { TimePickerProps } from 'antd/es/time-picker';
import moment from 'moment';

type InputShareConfig = {
  required?: boolean;
  autoFocus?: boolean;
  localize?: boolean;
};

type RangeSliderProps = {
  range: true;
} & Omit<SliderRangeProps, 'onChange' | 'range'>;

type BaseSliderProps = {
  range?: false | null;
} & Omit<SliderSingleProps, 'onChange' | 'range'>;

export type SliderInput = {
  type: 'slider';
  inputProps?: RangeSliderProps | BaseSliderProps;
};

export type TextInput = {
  type: 'text';
  inputProps?: Omit<TextAreaProps, 'onChange'>;
} & InputShareConfig;

export type StringInput = {
  type: 'string';
  inputProps?: Omit<InputProps, 'onChange'>;
} & InputShareConfig;

export type PasswordInput = {
  type: 'password';
  inputProps?: Omit<PasswordProps, 'onChange'>;
  required?: boolean;
  autoFocus?: boolean;
};

export type RateInput = {
  type: 'rate';
  inputProps?: Omit<RateProps, 'onChange'>;
};

export type SwitchInput = {
  type: 'switch';
  inputProps?: Omit<SwitchProps, 'onChange'>;
};

export type NumberInput = {
  type: 'number';
  inputProps?: Omit<InputNumberProps, 'onChange'>;
} & InputShareConfig;

export type ListInputProps = {
  remove?: string | any;
  add?: string | any;
  itemHeader?: string | any;
};

export type ListInput = {
  type: 'list';
  schema: AntSchema;
  inputProps: ListInputProps;
};

export type UploadInput = {
  type: 'upload';
  inputProps: UploadProps & {
    addComponent?: () => React.ReactNode;
    buttonProps?: ButtonProps;
  };
};

type Option = {
  value: any;
  label: string;
};

export type DatePickerInputProps = {
  type: 'date';
  inputProps?: Omit<DatePickerProps, 'onChange'>;
};

export type TimePickerInputProps = {
  type: 'time';
  value?: moment.Moment;
  inputProps?: Omit<TimePickerProps, 'onChange'>;
}

export type AutoCompleteInputProps = {
  type: 'autoComplete';
  onSearch: (searchedText: string) => void;
  options: Option[];
  inputProps?: Omit<AutoCompleteProps, 'onChange' | 'options' | 'onSearch'>;
};

type CustomInputProps = {
  value?: string;
  onChange?: (value: any) => void;
};

export type SelectInputProps = {
  type: 'select';
  options: Option[];
  inputProps?: Omit<SelectProps<any>, 'onChange'>;
} & CustomInputProps;

type CheckboxOption = {
  value: any;
  label: string;
  colProps?: ColProps;
  disabled?: boolean;
  help?: string;
};

export type CheckboxesInputProps = {
  type: 'checkboxes';
  options: CheckboxOption[];
  onChange?: (checked: any) => void;
  value?: any;
  layout?: 'horizontal' | 'vertical' | 'inline';
  inputProps?: Omit<CheckboxGroupProps, 'onChange'>;
};

export type RadioInputProps = {
  type: 'radio';
  style?: 'bullet' | 'button';
  layout?: 'vertical' | 'inline';
  options: CheckboxOption[];
  onChange?: (checked: any) => void;
  value?: any;
  inputProps?: Omit<RadioGroupProps, 'onChange'>;
};

export type CheckboxInputProps = {
  type: 'checkbox';
  text: string;
  inputProps?: Omit<CheckboxProps, 'onChange'>;
  onChange?: (checked: any) => void;
  checked?: boolean;
};

export type InputType =
  | DatePickerInputProps
  | AutoCompleteInputProps
  | StringInput
  | NumberInput
  | SelectInputProps
  | SliderInput
  | TextInput
  | RateInput
  | SwitchInput
  | CheckboxInputProps
  | CheckboxesInputProps
  | ListInput
  | RadioInputProps
  | UploadInput
  | PasswordInput;

export type FieldItemType = {
  name: string;
  key?: string;
  input: InputType;
  colProps?: ColProps;
  proxy?: {
    name: string;
    path: string[] | string;
  };
} & FormItemProps;

export type FieldType = {
  defaultValue?: any;
  errorKey?: string[] | string;
} & FieldItemType;

export type Configuration = {
  submitText?: string;
  cancelText?: string;
  layout: 'horizontal' | 'inline' | 'vertical'
  formProps?: FormProps;
  actionsWrapperProps?: {
    style?: React.CSSProperties;
    className?: string;
  }
};

// @ts-ignore
export type FieldSchema = AntSchema | FieldType | React.Component;

export function isReactNode(item: FieldSchema): item is React.Component {
  if (!item) return true;
  return (item as React.Component).props !== undefined;
}

export function isFormItem(item: FieldSchema): item is FieldType {
  return (item as FieldType).name !== undefined;
}

export type AntSchema = Array<FieldSchema>;
