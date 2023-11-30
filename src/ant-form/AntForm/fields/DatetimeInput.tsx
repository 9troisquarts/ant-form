// @ts-nocheck
import { Input } from 'antd';
import generatePicker from 'antd/es/date-picker/generatePicker';
import omit from 'lodash/omit';
import React, { useEffect } from 'react';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import dayjs, { Dayjs as DayjsType } from 'dayjs';

const DatePicker = generatePicker<DayjsType>(dayjsGenerateConfig);

const convertValue = (value?: DayjsType | string) => {
  if (value && !dayjs.isDayjs(value) && dayjs(value).isValid()) return dayjs(value);
  else if (value && dayjs.isDayjs(value)) return value;
  return value;
};

const DatetimeInput = (props: any) => {
  const { readOnly = false, value, inputProps: { format = 'DD/MM/YYYY HH:mm:ss' } = {} } = props;
  const [internalValue, setInternalValue] = React.useState(convertValue(value));
  useEffect(() => {
    setInternalValue(convertValue(value));
  }, [value]);

  if (readOnly) {
    let v = value;
    if (v && !dayjs.isDayjs(v) && dayjs(v).isValid()) v = dayjs(v);
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
