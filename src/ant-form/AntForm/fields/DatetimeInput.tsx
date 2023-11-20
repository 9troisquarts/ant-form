// @ts-nocheck
import { DatePicker, Input } from 'antd';
import { omit } from 'lodash';
import moment, { isMoment } from 'moment';
import React, { useEffect } from 'react';

const convertValue = (value?: moment.Moment | string) => {
  if (value && !isMoment(value) && moment(value).isValid()) return moment(value);
  else if (value && isMoment(value)) return value;
  return value;
};

const DatetimeInput = (props) => {
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
        format={format}
        // @ts-ignore
        value={internalValue}
      />
    );
  }

  const otherProps = omit(props, ['renderLabel']);
  return (
    // @ts-ignore
    <DatePicker
      style={{ width: '100%' }}
      {...(otherProps || {})}
      format={format}
      value={internalValue}
      showTime
    />
  );
};

export default DatetimeInput;
