import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

type TextAreaInputProps = {
  type: 'text';
  name: string;
  /** https://ant.design/components/input/#Input.TextArea */
  inputProps: TextAreaProps;
  value?: string | any;
  onChange: (value: string) => void;
  localize?: boolean;
  locale?: string;
};

const TextArea: React.FC<TextAreaInputProps> = props => {
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
