import React from 'react';
import { TimePickerInputProps } from '../types';
import dayjs, { Dayjs as DayjsType, isDayjs } from 'dayjs';
import generatePicker, { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

export interface TimePickerProps extends Omit<PickerTimeProps<DayjsType>, 'picker'> {}

const DatePicker = generatePicker<DayjsType>(dayjsGenerateConfig);

const TimeInput: React.FC<TimePickerInputProps> = (props) => {
  let v = undefined;
  if (props.value) v = isDayjs(props.value) ? props.value : dayjs(props.value);
  return <DatePicker style={{ width: '100%' }} {...props} picker="time" value={v} />;
};

export default TimeInput;
