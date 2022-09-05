// @ts-nocheck
import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatable, {
  AsyncCreatableProps,
} from 'react-select/async-creatable';
import memoOnlyForKeys from './src/memoOnlyForKeys';

export type AntFormReactSelectInputOptions = {
  valueType?: 'string' | 'object';
  optionLabel: string;
  optionValue: string;
};

export type AntFormReactSelectProps = {
  value: string | any;
  creatable?: boolean;
  onChange: (value: string | any) => void;
  loadOptions: (search: string) => void;
  config: any;
  isMulti: boolean;
  options: AntFormReactSelectInputOptions;
  inputProps: AsyncCreatableProps;
};

export const AntFormReactSelect: React.FC<AntFormReactSelectProps> = props => {
  const {
    value,
    config,
    loadOptions,
    options: { optionLabel, valueType = 'object', optionValue },
    creatable = false,
    onChange,
    isMulti,
    ...rest
  } = props;
  const { style, ...restConfig } = config;
  const [internalValue, setInternalValue] = useState(value || null);
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let v = value || internalValue;
  if (valueType === 'string'){
    if(isMulti)
      v = (v || []).map((i: any) => ({ [optionValue]: i }));
    else
      v = value ? { [optionValue]: value } : null;
  }

  const ReactSelectComponent = creatable ? AsyncCreatable : AsyncSelect;

  const triggerChange = (option: any) => {
    if (valueType === 'string') {
      let nextOptions = null;
      if(isMulti && option) {
        nextOptions = option.map((o: any) => o[optionValue]);
      } else if (option) {
        nextOptions = option[optionValue]
      }
      setInternalValue(nextOptions);
      onChange(nextOptions);
    } else {
      setInternalValue(option);
      onChange(option);
    }
  };

  const getNewOptionData = (_inputValue: any, label: string) => ({
    [optionLabel]: label,
    [optionValue]: label,
  });

  const formatCreateLabel = (searchValue: string) => searchValue;

  return (
    <ReactSelectComponent
      cacheOptions
      formatCreateLabel={formatCreateLabel}
      placeholder=""
      getNewOptionData={getNewOptionData}
      classNamePrefix="ant-form-react-select"
      styles={config.styles || {}}
      {...(restConfig || {})}
      {...rest}
      isMulti={isMulti}
      value={v || null}
      onChange={triggerChange}
      loadOptions={loadOptions}
      getOptionLabel={
        typeof optionLabel === 'function'
          ? optionLabel
          : (option: any) => option[optionLabel]
      }
      getOptionValue={
        typeof optionValue === 'function'
          ? optionValue
          : (option: any) => option[optionValue]
      }
    />
  );
};

export default React.memo(
  AntFormReactSelect,
  memoOnlyForKeys(['value', 'loadOptions']),
);
