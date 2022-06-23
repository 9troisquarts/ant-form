import React from 'react';
import { Input } from 'antd';
import { TextInput } from '../types';

interface TextAreaProps {
  name: string;
  value?: string | any;
  localize?: boolean;
  locale?: string;
  onChange: (value: string) => void;
  inputProps?: TextInput;
};

const TextArea: React.FC<TextAreaProps> = props => {
  const {
    inputProps,
    onChange,
    localize = false,
    locale,
    value,
    ...rest
  } = props;

  const handleChange = ({ target: { value }}: { target: { value: string }}) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value} : value;
    onChange(nextValue);
  }

  let v = value;
  if (localize && locale && v) v = v.hasOwnProperty(locale) && v[locale] ? v[locale] : undefined;

  return (
    <Input.TextArea
      {...inputProps}
      {...rest}
      value={v}
      onChange={handleChange}
    />
  );
};

export default TextArea;
