import {
  AutoComplete,
  Checkbox,
  Col,
  Input,
  InputNumber as AInputNumber,
  Radio,
  Rate as ARate,
  Row,
  Slider as ASlider,
  Switch as ASwitch,
  TimePicker,
} from 'antd';
import { PasswordProps } from 'antd/es/input';
import { InputNumberProps } from 'antd/es/input-number';
import { RateProps } from 'antd/es/rate';
import { SliderBaseProps } from 'antd/es/slider';
import { SwitchProps } from 'antd/es/switch';
import React from 'react';
import { AntFormColorPicker } from '../../../ant-form-color-picker';
import {
  AutoCompleteInputProps,
  CheckboxesInputProps,
  CheckboxInputProps,
  RadioInputProps,
} from '../types';
import Boolean from './Boolean';
import ContentEditableInput from './ContentEditableInput';
import DateRange from './DateRange';
import DatetimeInput from './DatetimeInput';
import DecimalInput from './Decimal';
import Dropdown from './Dropdown';
import FileInput from './File';
import InputString from './InputString';
import ListField from './ListField';
import SearchInput from './Search';
import SelectInput from './SelectInput';
import TextArea from './Textarea';
import UploadInput from './Upload';
import { AntFormMarkdownEditor } from '../../../ant-form-markdown-editor';
import Transfer from './Transfer';
import DateInput from './DateInput';
import TimeInput from './TimeInput';

const { Password: APassword } = Input;

type SharedProps = {
  inputProps: any;
};

const CheckboxInput: React.FC<CheckboxInputProps> = (props) => {
  const { text, checked, readOnly = false, onChange, ...other } = props;

  return (
    <Checkbox
      {...other}
      disabled={readOnly || props.inputProps?.disabled}
      checked={checked}
      onChange={onChange}
    >
      {text}
    </Checkbox>
  );
};

const RadioInput: React.FC<RadioInputProps> = (props) => {
  const {
    options,
    style = 'bullet',
    readOnly = false,
    layout = 'inline',
    onChange,
    value,
    ...other
  } = props;

  const radioStyles =
    layout === 'vertical' && style === 'bullet'
      ? {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        }
      : {};

  const RadioComponent = style === 'button' ? Radio.Button : Radio;
  // TODO COL PROPS
  return (
    <Radio.Group {...other} value={value} style={{ width: '100%' }} onChange={onChange}>
      {options.map((option) => (
        <RadioComponent
          style={radioStyles}
          key={option.value}
          disabled={option.disabled || readOnly}
          value={option.value}
        >
          {option.label}
          {option.help}
        </RadioComponent>
      ))}
    </Radio.Group>
  );
};

const CheckboxesInput: React.FC<CheckboxesInputProps> = (props) => {
  const { options, onChange, value, readOnly = false, inputProps, ...other } = props;
  return (
    <Checkbox.Group
      {...other}
      {...inputProps}
      value={value}
      style={{ width: '100%' }}
      onChange={onChange}
    >
      <Row>
        {options.map((option) => (
          <Col key={option.value} {...(option.colProps ? option.colProps : { span: 24 })}>
            <Checkbox disabled={option.disabled || readOnly} value={option.value}>
              {option.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = (props) => {
  const { options, onSearch, ...other } = props;
  return <AutoComplete {...other} onSearch={onSearch} options={options} />;
};

const Rate: React.FC<RateProps & SharedProps> = ({ inputProps = {}, ...props }) => (
  <ARate {...props} {...(inputProps || {})} />
);

const Switch: React.FC<SwitchProps & SharedProps> = ({ inputProps = {}, ...props }) => (
  <ASwitch {...props} {...(inputProps || {})} />
);

const InputNumber: React.FC<InputNumberProps & SharedProps> = ({ inputProps = {}, ...props }) => (
  <AInputNumber {...props} {...(inputProps || {})} />
);

const Slider: React.FC<SliderBaseProps & SharedProps> = ({ inputProps = {}, ...props }) => (
  <ASlider {...props} {...(inputProps || {})} />
);

const Password: React.FC<PasswordProps & SharedProps> = ({ inputProps = {}, ...props }) => (
  <APassword {...props} {...(inputProps || {})} />
);

type FieldsTypeInterface = {
  [key: string]: {
    valuePropName?: string;
    showFormItemError?: boolean;
    component: React.ElementType;
    props?: any;
  };
};

export const defaultFieldsType: FieldsTypeInterface = {
  switch: {
    valuePropName: 'checked',
    component: Switch,
  },
  boolean: {
    component: Boolean,
  },
  rate: {
    component: Rate,
  },
  text: {
    component: TextArea,
  },
  slider: {
    component: Slider,
  },
  string: {
    component: InputString,
  },
  number: {
    component: InputNumber,
  },
  select: {
    component: SelectInput,
  },
  checkbox: {
    valuePropName: 'checked',
    component: CheckboxInput,
  },
  checkboxes: {
    component: CheckboxesInput,
  },
  radio: {
    component: RadioInput,
  },
  autoComplete: {
    component: AutoCompleteInput,
  },
  date: {
    component: DateInput,
  },
  time: {
    component: TimeInput,
  },
  list: {
    component: ListField,
  },
  upload: {
    component: UploadInput,
  },
  decimal: {
    component: DecimalInput,
  },
  password: {
    component: Password,
  },
  datetime: {
    component: DatetimeInput,
  },
  dropdown: {
    component: Dropdown,
  },
  daterange: {
    component: DateRange,
  },
  markdown: {
    component: AntFormMarkdownEditor,
  },
  search: {
    component: SearchInput,
  },
  contenteditable: {
    component: ContentEditableInput,
  },
  color: {
    component: AntFormColorPicker,
  },
  file: {
    component: FileInput,
  },
  files: {
    component: FileInput,
    props: {
      multiple: true,
    },
  },
  transfer: {
    component: Transfer,
  },
};

const fieldsType = {
  ...defaultFieldsType,
};

export const extendInput = (inputType: string, inputConfig: any) => {
  fieldsType[inputType] = inputConfig;
  return fieldsType;
};

export default fieldsType;
