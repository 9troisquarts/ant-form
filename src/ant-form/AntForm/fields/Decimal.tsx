import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

/*
 * DecimalInput component
 */

const DecimalInput = (props: any) => {
  const { value, inputProps = {}, onChange } = props;

  const clearValue = (value = '') => {
    let valueOnlyAllowedCharacters = value.toString().replace(/[^0-9,.]/g, '');
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
    tmp = tmp.filter((char, i) => !dotIndexesToRemove.includes(i));
    let decimalValue = parseFloat(tmp.join(''));
    if (!isNaN(decimalValue)) {
      return decimalValue;
    }
    return '';
  };

  const [internalValue, setInternalValue]: any = useState(clearValue(value));

  useEffect(() => setInternalValue(value), [value]);

  // @ts-ignore
  const handleChange = ({ target: { value } }) => {
    let clearedValue = clearValue(value);
    console.log('cl', clearedValue);
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
