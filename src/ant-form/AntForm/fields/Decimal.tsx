import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

/*
 * DecimalInput component
 */

const DecimalInput = (props: any) => {
  const { value, inputProps = {}, onChange } = props;

  const [internalValue, setInternalValue]: any = useState(undefined);

  const clearValue = (value: any = '') => {
    if (!value || (value && typeof value?.trim === 'function' && value?.trim() === '')) {
      setInternalValue(undefined);
      onChange(undefined);
      return undefined;
    }
    let valueOnlyAllowedCharacters = value?.toString()?.replace(/[^0-9,.]/g, '');
    let valueOnlyDots = valueOnlyAllowedCharacters.replaceAll(',', '.');
    var tmp = valueOnlyDots.split('');
    let dotIndexesToRemove: any = [];
    let skipedFirstDot = false;
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i] === '.') {
        if (!skipedFirstDot) {
          skipedFirstDot = true;
        } else {
          dotIndexesToRemove.push(i);
        }
      }
    }
    tmp = tmp.filter((char: any, i: number) => !dotIndexesToRemove.includes(i));
    let decimalValue = tmp.join('');
    if (!isNaN(decimalValue)) {
      return decimalValue;
    }
    return undefined;
  };

  useEffect(() => setInternalValue(clearValue(value)), [value]);

  // @ts-ignore
  const handleChange = ({ target: { value } }) => {
    let clearedValue = clearValue(value);
    setInternalValue(clearedValue);
    onChange(clearedValue);
  };

  return (
    <div style={{ width: inputProps.width ? inputProps.width : '100%' }}>
      <Input onChange={handleChange} value={internalValue} {...(inputProps || {})} />
    </div>
  );
};

export default DecimalInput;
