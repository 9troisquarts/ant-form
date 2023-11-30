import React from 'react';
import omit from 'lodash/omit';
import dayjs, { Dayjs as DayjsType, isDayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import ConfigurationContext from '../ConfigurationContext';
import { useContext } from 'react';
import { DatePickerInputProps } from '../types';
import { Input } from 'antd';

const DatePicker = generatePicker<DayjsType>(dayjsGenerateConfig);

const DateInput: React.FC<DatePickerInputProps> = (props) => {
  const { readOnly, value } = props;
  const config = useContext(ConfigurationContext);
  let v = value;
  if (v && !isDayjs(v) && dayjs(v).isValid()) v = dayjs(v);

  if (readOnly) {
    return (
      <Input
        readOnly
        value={
          v && isDayjs(v)
            ? v.format(props.inputProps?.format || config?.dateFormat || 'L')
            : undefined
        }
      />
    );
  }
  const otherProps = omit(props, ['renderLabel']);

  return (
    <DatePicker
      style={{ width: '100%' }}
      format="L"
      {...otherProps}
      // @ts-ignore
      value={v}
      onChange={props.onChange}
    />
  );
};

export default DateInput;
