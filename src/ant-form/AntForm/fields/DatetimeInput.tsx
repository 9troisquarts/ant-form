import { DatePicker, Input } from 'antd';
import { omit } from 'lodash';
import moment, { isMoment } from 'moment';
import React, { useEffect } from 'react';
import { DateTimeInputProps } from '../types';

const convertValue = (value?: moment.Moment | string) => {
  if (value && !isMoment(value) && moment(value).isValid()) return moment(value);
  else if (value && isMoment(value)) return value;
  return value;
};

const DatetimeInput: React.FC<DateTimeInputProps> = (props) => {
  const { readOnly = false, value, inputProps: { format = 'LLL' } = {} } = props;
  const [internalValue, setInternalValue] = React.useState(convertValue(value));
  useEffect(() => {
    setInternalValue(convertValue(value));
  }, [value]);

  if (readOnly) {
    let v = value;
    if (v && !isMoment(v) && moment(v).isValid()) v = moment(v);
    return (
      <Input
        readOnly
        // @ts-ignore
        value={v ? v.format(props.inputProps?.format || 'DD/MM/YYYY HH:mm:ss') : undefined}
      />
    );
  }

  const otherProps = omit(props, ['renderLabel']);
  return (
    // @ts-ignore
    <DatePicker
      style={{ width: '100%' }}
      format={format}
      // ts-ignore
      value={internalValue}
      {...(otherProps || {})}
      showTime
    />
  );
};

export default DatetimeInput;
