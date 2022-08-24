import { Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { SearchInputProps } from '../types';

const { Search } = Input;

type SearchProps = SearchInputProps & {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchProps> = props => {
  const {
    value,
    inputProps = {},
    onChange,
  } = props;

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
