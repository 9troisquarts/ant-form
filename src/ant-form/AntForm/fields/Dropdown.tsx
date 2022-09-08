import React, { useEffect, useState } from 'react';
import { Menu, Dropdown as ADropdown } from 'antd';
import { DropdownInput } from '../types';
import { DownOutlined } from '@ant-design/icons';

type DropdownProps = DropdownInput & {
  value: string | string[];
  onChange: (value: string | string[] | undefined) => void;
}

const Dropdown: React.FC<DropdownProps> = props => {
  const {
    inputProps = {},
    value,
    options,
    onChange
  } = props;

  const {
    multiple = false,
    separator = ', ',
    placeholder = "-",
    className = ""
  } = inputProps;

  const [internalValue, setInternalValue] = useState<string | string[]>(value || []);
  useEffect(() => setInternalValue(value || []), [value]);

  const onSelect = ({ selectedKeys, key }: { key: string; selectedKeys: string[] }) => {
    if (multiple) {
      if (internalValue && internalValue.indexOf(key) === -1) {
        let nextValue = [...internalValue];
        nextValue.push(key)
        onChange(nextValue);
        setInternalValue(nextValue)
      }
    } else {
      onChange(key);
      setInternalValue(key);
    }
  }

  const onDeselect = ({ key, selectedKeys }: { key: string; selectedKeys: string[] }) => {
    if (multiple && Array.isArray(internalValue)) {
      const index = internalValue.indexOf(key);
      const nextValue = [...internalValue].splice(index, 1);
      onChange(nextValue);
      setInternalValue(nextValue);
    } else {
      onChange(undefined);
      setInternalValue([])
    }
  };
  let keys: string | string[] = [];
  if(internalValue) keys = Array.isArray(internalValue) ? internalValue : [internalValue]

  const menu = (
    <Menu
      selectable
      onSelect={onSelect}
      onDeselect={onDeselect}
      selectedKeys={keys}
      items={options.map(option => ({
        key: option.value,
        label: option.label
      }))}
    />
  );

  let valueDisplayed: string | undefined;
  if(value) {
    valueDisplayed = Array.isArray(internalValue) ? options.filter(o => internalValue.includes(o.value)).map(o => o.label).join(separator) : options.find(o => o.value === internalValue)?.label
  }
  if (!valueDisplayed) valueDisplayed = placeholder

  return (
    <ADropdown overlay={menu}>
      <span className={`ant-form-dropdown ${className}`}>
        {valueDisplayed}
        <DownOutlined style={{ marginLeft: 7 }} />
      </span>
    </ADropdown>
  )
};

export default Dropdown;
