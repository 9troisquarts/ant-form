import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DateRangeInputProps } from '../types';

const { RangePicker } = DatePicker;

type ValueType = {
  [k: string]: string | moment.Moment
};

type DateRangeProps = DateRangeInputProps & {
  /**
   *  Name of attribute defining the object return [start, end]
  */
  name: string[];
  value: ValueType;
  onChange: (values: any) => void;
};

const DateRange: React.FC<DateRangeProps> = props => {
  const {
    value,
    onChange,
    name,
    inputProps = {}
  } = props;

  const [startName, endName] = name;
  const [internalValue, setInternalValue] = useState<ValueType>(value || {});

  useEffect(() => {
    setInternalValue(value || {})
  }, [value])

  const handleChange = (mDates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => {
    const nextValues = mDates ? {
      [startName]: mDates[0],
      [endName]: mDates[1],
    } : {}
    onChange(nextValues);
    setInternalValue(nextValues);
  }

  let from = internalValue[startName];
  if(from && !moment.isMoment(from)) from = moment(from).startOf('day');

  let to = internalValue[endName];
  if(to && !moment.isMoment(to)) to = moment(to).startOf('day');

  const v = [
    from,
    to
  ];

  return (
    // @ts-ignore
    <RangePicker
      {...(inputProps || {})}
      value={v}
      onChange={handleChange}
    />
  )
}

export default DateRange;
