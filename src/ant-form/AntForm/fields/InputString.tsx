import React from 'react';
import { Input } from 'antd';
import { StringInput } from '../types';

type InputStringProps = {
  name: string;
  value?: string | any;
  localize?: boolean;
  locale?: string;
  onChange: (value: string) => void;
  inputProps?: StringInput;
};

const InputString: React.FC<InputStringProps> = props => {
  const {
    inputProps,
    onChange,
    localize = false,
    locale,
    value,
  } = props;

  const handleChange = ({ target: { value }}: { target: { value: string }}) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value} : value;
    onChange(nextValue);
  }

  let v = value;
  if (localize && locale && v) v = v.hasOwnProperty(locale) && v[locale] ? v[locale] : undefined;

  return (
    <Input
      {...inputProps}
      value={v}
      onChange={handleChange}
    />
  );
};

export default InputString;
