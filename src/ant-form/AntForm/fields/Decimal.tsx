import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

/*
 * DecimalInput component
 */

const DecimalInput = (props: any) => {
  const { value, inputProps = {}, onChange } = props;

  const [internalValue, setInternalValue]: any = useState(value);

  useEffect(() => setInternalValue(value), [value]);

  const clearValue = (value = '') => {
    let valueOnlyAllowedCharacters = value.toString().replace(/[^0-9,.]/g, '');
    let valueOnlyDots = valueOnlyAllowedCharacters.replaceAll(',', '.');
    var tmp = valueOnlyDots.split('.');
    let valueOnlyNumeric = tmp.shift() + (tmp.length ? '.' + tmp.join('') : '');
    return parseFloat(valueOnlyNumeric) || '';
  };

  // @ts-ignore
  const handleChange = ({ target: { value } }) => {
    let clearedValue = clearValue(value);
    onChange(clearedValue);
    setInternalValue(clearedValue);
  };

  return (
    <div style={{ width: inputProps.width ? inputProps.width : '100%' }}>
      <Input onChange={handleChange} value={internalValue} {...(inputProps || {})} />
    </div>
  );
};

export default DecimalInput;
