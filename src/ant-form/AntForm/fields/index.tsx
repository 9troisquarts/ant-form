import React from 'react';
import {
  InputNumber as AInputNumber,
  Select,
  Slider as ASlider,
  Rate as ARate,
  Switch as ASwitch,
  Checkbox,
  Row,
  Col,
  AutoComplete,
  Radio,
  DatePicker,
  Input,
  TimePicker,
} from 'antd';
import {
  SelectInputProps,
  CheckboxInputProps,
  DatePickerInputProps,
  CheckboxesInputProps,
  AutoCompleteInputProps,
  RadioInputProps,
  TimePickerInputProps
} from '../types';
import moment from 'moment'
import ListField from './ListField';
import UploadInput from './Upload';
import { memoOnlyForKeys } from '../../_utils/helpers';
import InputString from './InputString';
import TextArea from './Textarea';
import Boolean from './Boolean';
import ContentEditableInput from './ContentEditableInput';
import { RateProps } from 'antd/es/rate';
import { SwitchProps } from 'antd/es/switch';
import { InputNumberProps } from 'antd/es/input-number';
import { SliderBaseProps } from 'antd/es/slider';
import { PasswordProps } from 'antd/es/input';
import DateRange from './DateRange';
import SearchInput from './Search';
import Dropdown from './Dropdown';

const { Password: APassword } = Input;

type SharedProps = {
  inputProps: any;
};

const filterOption = (input: string, option: any) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const SelectInput: React.FC<SelectInputProps> = React.memo(props => {
  const { options, onChange, value: v, inputProps = {}, ...rest } = props;

  return (
    <Select
      filterOption={filterOption}
      {...(inputProps || {})}
      {...rest}
      onChange={onChange}
      value={v}
    >
      {options.map(({ value, label, children, options }) => {
        if (options && options.length > 0) {
            return (
              <Select.OptGroup key={label} label={label}>
                {options.map(option => (
                  <Select.Option value={option.value} label={option.label} key={option.value}>
                    {option.children || option.label}
                  </Select.Option>
                ))}
              </Select.OptGroup>
            )
        }
        return (
          <Select.Option value={value} label={label} key={value}>
            {children || label}
          </Select.Option>
        )
      })}
    </Select>
  );
}, memoOnlyForKeys(['options', 'readOnly', 'value']));

const CheckboxInput: React.FC<CheckboxInputProps> = props => {
  const { text, checked, onChange, ...other } = props;

  return (
    <Checkbox {...other} checked={checked} onChange={onChange}>
      {text}
    </Checkbox>
  );
};

const RadioInput: React.FC<RadioInputProps> = props => {
  const { options, style = "bullet", layout = 'inline', onChange, value, ...other } = props;

  const radioStyles =
    layout === 'vertical' && style === "bullet"
      ? {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        }
      : {};

  const RadioComponent = style === "button" ? Radio.Button : Radio;
  // TODO COL PROPS
  return (
    <Radio.Group
      {...other}
      value={value}
      style={{ width: '100%' }}
      onChange={onChange}
    >
      {options.map(option => (
        <RadioComponent
          style={radioStyles}
          key={option.value}
          disabled={option.disabled}
          value={option.value}
        >
          {option.label}
          {option.help}
        </RadioComponent>
      ))}
    </Radio.Group>
  );
};

const CheckboxesInput: React.FC<CheckboxesInputProps> = props => {
  const { options, onChange, value, inputProps, ...other } = props;
  return (
    <Checkbox.Group
      {...other}
      {...inputProps}
      value={value}
      style={{ width: '100%' }}
      onChange={onChange}
    >
      <Row>
        {options.map(option => (
          <Col
            key={option.value}
            {...(option.colProps ? option.colProps : { span: 24 })}
          >
            <Checkbox disabled={option.disabled} value={option.value}>
              {option.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = props => {
  const { options, onSearch, ...other } = props;
  return <AutoComplete {...other} onSearch={onSearch} options={options} />;
};

const DateInput: React.FC<DatePickerInputProps> = props => (
  <DatePicker style={{ width: '100%' }} {...props} />
);

const Rate: React.FC<RateProps & SharedProps> = ({ inputProps = {}, ...props}) => (
  <ARate {...props} {...(inputProps || {})} />
);

const Switch: React.FC<SwitchProps & SharedProps> = ({ inputProps = {}, ...props}) => (
  <ASwitch {...props} {...(inputProps || {})} />
);

const InputNumber: React.FC<InputNumberProps & SharedProps> = ({ inputProps = {}, ...props}) => (
  <AInputNumber {...props} {...(inputProps || {})} />
);

const Slider: React.FC<SliderBaseProps & SharedProps> = ({ inputProps = {}, ...props}) => (
  <ASlider {...props} {...(inputProps || {})} />
);

const Password: React.FC<PasswordProps & SharedProps> = ({ inputProps = {}, ...props}) => (
  <APassword {...props} {...(inputProps || {})} />
);


const TimeInput: React.FC<TimePickerInputProps> = props => {
  let v = undefined;
  if(props.value)
    v = moment.isMoment(props.value) ? props.value : moment(props.value)
  return (
    <TimePicker style={{ width: '100%' }} {...props} value={v} />
  )
}

type FieldsTypeInterface = {
  [key: string]: {
    valuePropName?: string;
    showFormItemError?: boolean;
    component: React.ElementType;
  };
};

export const defaultFieldsType: FieldsTypeInterface = {
  switch: {
    valuePropName: 'checked',
    component: Switch,
  },
  boolean: {
    component: Boolean
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
    component: TimeInput
  },
  list: {
    component: ListField,
  },
  upload: {
    component: UploadInput,
  },
  password: {
    component: Password
  },
  dropdown: {
    component: Dropdown,
  },
  daterange: {
    component: DateRange
  },
  search: {
    component: SearchInput,
  },
  contenteditable: {
    component: ContentEditableInput
  }
};

const fieldsType = {
  ...defaultFieldsType,
};

export const extendInput = (inputType: string, inputConfig: any) => {
  fieldsType[inputType] = inputConfig;
  return fieldsType;
};

export default fieldsType;
