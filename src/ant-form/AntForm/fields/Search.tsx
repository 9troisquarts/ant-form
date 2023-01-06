import { Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { InputShareConfig, SearchInputProps } from '../types';

const { Search } = Input;

type InternalProps = {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const {
    value,
    inputProps = {},
    onChange,
  } = (props as (SearchInputProps & InternalProps));

  const [internalValue, setInternalValue] = useState<string>(value);
  useEffect(() => setInternalValue(value), [value]);

  // @ts-ignore
  const handleChange = ({ target: { value }}) => {
    onChange(value);
    setInternalValue(value);
  }

  const handleSearch = (value: string) => {
    onChange(value);
    if (inputProps.onSearch) inputProps.onSearch(value);
  }

  return (
    <Search
      {...inputProps || {}}
      onChange={handleChange}
      onSearch={handleSearch}
      value={internalValue}
    />
  )
}

export default SearchInput;
