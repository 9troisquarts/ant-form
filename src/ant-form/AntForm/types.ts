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
import { RangePickerProps } from 'antd/lib/date-picker';
import { SearchProps } from 'antd/lib/input';
import { AntFormRailsNestedProps } from '../../ant-form-rails-nested';

export type InputShareConfig = {
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

export type ListInput<T> = {
  type: 'list';
  schema: AntSchema<T>;
  inputProps: ListInputProps;
};

export type UploadInput = {
  type: 'upload';
  inputProps: UploadProps & {
    addComponent?: () => React.ReactNode;
    buttonProps?: ButtonProps;
  };
};

export type DropdownInput = {
  type: 'dropdown';
  options: Option[];
  inputProps: {
    multiple?: boolean;
    separator?: string;
    className?: string;
    placeholder?: string;
  };
};

type Option = {
  value: any;
  label: string;
  children?: React.ReactNode[] | React.ReactNode;
  options?: Option[];
};

export type DatePickerInputProps = {
  type: 'date';
  readOnly?: boolean;
  value?: string | moment.Moment;
  inputProps?: Omit<DatePickerProps, 'onChange'>;
};

export type DateTimeInputProps = {
  type: 'datetime';
  readOnly?: boolean;
  value?: string | moment.Moment;
  inputProps: Omit<DatePickerProps, 'onChange' | 'showTime'>;
};

export type TimePickerInputProps = {
  type: 'time';
  value?: moment.Moment;
  inputProps?: Omit<TimePickerProps, 'onChange'>;
};

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
  readOnly?: boolean;
} & CustomInputProps;

type CheckboxOption = {
  value: any;
  label: string;
  colProps?: ColProps;
  disabled?: boolean;
  help?: string;
  tooltip?: string;
};

export type CheckboxesInputProps = {
  type: 'checkboxes';
  options: CheckboxOption[];
  onChange?: (checked: any) => void;
  value?: any;
  readOnly?: boolean;
  layout?: 'horizontal' | 'vertical' | 'inline';
  inputProps?: Omit<CheckboxGroupProps, 'onChange'>;
};

export type RadioInputProps = {
  type: 'radio';
  style?: 'bullet' | 'button';
  layout?: 'vertical' | 'inline';
  options: CheckboxOption[];
  readOnly?: boolean;
  onChange?: (checked: any) => void;
  value?: any;
  inputProps?: Omit<RadioGroupProps, 'onChange'>;
};

export type CheckboxInputProps = {
  type: 'checkbox';
  text: string;
  inputProps?: Omit<CheckboxProps, 'onChange'>;
  onChange?: (checked: any) => void;
  readOnly?: boolean;
  checked?: boolean;
};

export type DateRangeInputProps = {
  type: 'daterange';
  name: string[];
  /**
    https://ant.design/components/date-picker/#RangePicker
  */
  inputProps: RangePickerProps;
};

type ContentEditableOptions = {
  tagName?: string;
  className?: string;
  style?: React.CSSProperties;
};

export type ContentEditableInputProps = {
  type: 'contenteditable';
  /**
   *  Name of attribute
   */
  name: string;
  value: string;
  onChange: (value: string) => void;
  inputProps?: ContentEditableOptions;
};

export type SearchInputProps = {
  type: 'search';
  /**
    https://ant.design/components/input/#Input.Search
  */
  name: string;
  inputProps: SearchProps;
} & InputShareConfig;

export type InputType<T> =
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
  | DateRangeInputProps
  | ListInput<T>
  | RadioInputProps
  | UploadInput
  | DropdownInput
  | PasswordInput
  | ContentEditableInputProps
  | AntFormRailsNestedProps;

export type FieldItemType<T> = {
  name: keyof T;
  key?: string;
  condition?: (object: T) => boolean;
  hidden?: boolean;
  input: InputType<T>;
  colProps?: ColProps;
  help?: string;
  tooltip?: string;
  proxy?: {
    name: keyof T;
    path?: string[] | string;
  };
} & FormItemProps;

export type FieldType<T> = {
  defaultValue?: any;
  errorKey?: string[] | string;
} & FieldItemType<T>;

export type Configuration = {
  actionsWrapperProps?: {
    style?: React.CSSProperties;
    className?: string;
  };
  cancelText?: string;
  formProps?: FormProps;
  language?: 'fr' | 'en' | 'es';
  layout: 'horizontal' | 'inline' | 'vertical';
  submitText?: string;
  /** Icon to use for tooltip */
  tooltipIcon?: React.ReactNode;
  file?: {
    addButtonText?: string;
    emptyText?: string;
  };
};

// @ts-ignore
export type FieldSchema<T> = AntSchema<T> | FieldType<T> | React.Component;

export function isReactNode(item: FieldSchema<any>): item is React.Component {
  if (!item) return true;
  return (item as React.Component).props !== undefined;
}

export function isFormItem(item: FieldSchema<any>): item is FieldType<any> {
  return (item as FieldType<any>).name !== undefined;
}

export type AntSchema<T> = Array<FieldSchema<T>>;
