import { DatePicker, Input } from 'antd';
import { omit } from 'lodash';
import moment, { isMoment } from 'moment';
import React from 'react';
import { DatePickerInputProps } from '../types';

const DatetimeInput: React.FC<DatePickerInputProps> = (props) => {
  const { readOnly, value } = props;

  if (readOnly) {
    let v = value;
    if (v && !isMoment(v) && moment(v).isValid()) v = moment(v);
    return (
      <Input
        readOnly
        // @ts-ignore
        value={v ? v.format(props.inputProps?.format || "DD/MM/YYYY HH:mm:ss") : undefined}
      />
    );
  }

  const otherProps = omit(props, ['renderLabel']);

  return (
    // @ts-ignore
    <DatePicker
      style={{ width: '100%' }}
      format="DD/MM/YYYY HH:mm:ss"
      // @ts-ignore
      value={value}
      {...(otherProps || {})}
      showTime
    />
  );
};

export default DatetimeInput;
