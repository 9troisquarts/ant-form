import { Input, Select } from 'antd';
import React from 'react';

import { memoOnlyForKeys } from '../../_utils/helpers';
import { SelectInputProps } from '../types';

const filterOption = (input: string, option: any) =>
  option.label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .indexOf(
      input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
    ) >= 0;

const SelectInput: React.FC<SelectInputProps> = React.memo((props) => {
  const { options, onChange, value: v, readOnly = false, inputProps = {}, name, ...rest } = props;

  if (readOnly && inputProps.mode !== 'multiple') {
    return <Input readOnly value={v ? options.find((o) => o.value === v)?.label : undefined} />;
  }

  return (
    <Select
      id={`ant-form-${name}`}
      filterOption={filterOption}
      showSearch={true}
      {...(inputProps || {})}
      {...rest}
      onChange={onChange}
      value={inputProps.mode && inputProps.mode === 'multiple' && !v ? [] : v}
      disabled={readOnly || inputProps.disabled}
    >
      {options.map(({ value, label, children, options }) => {
        if (options && options.length > 0) {
          return (
            <Select.OptGroup key={label} label={label}>
              {options.map((option) => (
                <Select.Option value={option.value} label={option.label} key={option.value}>
                  {option.children || option.label}
                </Select.Option>
              ))}
            </Select.OptGroup>
          );
        }
        return (
          <Select.Option value={value} label={label} key={value}>
            {children || label}
          </Select.Option>
        );
      })}
    </Select>
  );
}, memoOnlyForKeys(['options', 'readOnly', 'value']));

export default SelectInput;
