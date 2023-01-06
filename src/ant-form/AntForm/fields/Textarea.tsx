import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

type TextAreaInputProps = {
  type: 'text';
  name: string;
  localize?: boolean;
  /** https://ant.design/components/input/#Input.TextArea */
  inputProps: TextAreaProps;
};


type InternalProps = {
  value?: string | any;
  locale?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

// @ts-ignore
const TextArea: React.FC<TextAreaInputProps> = (props: (TextAreaInputProps & InternalProps)) => {
  const {
    inputProps,
    onChange,
    localize = false,
    readOnly = false,
    locale,
    value
  } = (props);

  const handleChange = ({ target: { value }}: { target: { value: string }}) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value} : value;
    onChange(nextValue);
  }

  let v = value;
  if (localize && locale && v) v = v.hasOwnProperty(locale) && v[locale] ? v[locale] : undefined;

  return (
    <Input.TextArea
      {...(inputProps || {})}
      readOnly={readOnly}
      value={v}
      onChange={handleChange}
    />
  );
};

export default TextArea;
