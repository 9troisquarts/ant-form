import React, { useEffect, useState } from 'react';
import { DateRangeInputProps } from '../types';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import dayjs, { Dayjs as DayjsType } from 'dayjs';

const DatePicker = generatePicker<DayjsType>(dayjsGenerateConfig);

const { RangePicker } = DatePicker;

type ValueType = {
  [k: string]: string | DayjsType;
};

type DateRangeProps = DateRangeInputProps & {
  /**
   *  Name of attribute defining the object return [start, end]
   */
  name: string[];
  value: ValueType;
  onChange: (values: any) => void;
};

const DateRange: React.FC<DateRangeProps> = (props) => {
  const { value, onChange, name, inputProps = {} } = props;

  const [startName, endName] = name;
  const [internalValue, setInternalValue] = useState<ValueType>(value || {});

  useEffect(() => {
    setInternalValue(value || {});
  }, [value]);

  const handleChange = (mDates: [DayjsType, DayjsType], dateStrings: [string, string]) => {
    const nextValues = mDates
      ? {
          [startName]: mDates[0],
          [endName]: mDates[1],
        }
      : {};
    onChange(nextValues);
    setInternalValue(nextValues);
  };

  let from = internalValue[startName];
  if (from && !dayjs.isDayjs(from)) from = dayjs(from).startOf('day');

  let to = internalValue[endName];
  if (to && !dayjs.isDayjs(to)) to = dayjs(to).startOf('day');

  const v = [from as DayjsType, to as DayjsType];

  return (
    // @ts-ignore
    <RangePicker
      {...(inputProps || {})}
      className={`ant-form-daterange ${inputProps?.className || ''}`}
      value={v}
      onChange={handleChange}
    />
  );
};

export default DateRange;
