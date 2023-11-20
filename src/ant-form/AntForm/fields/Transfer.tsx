import React, { useEffect, useState } from 'react';
import { Transfer, TransferProps } from 'antd';

type OptionType = { label: string; value?: string; key?: string; description?: string };

type TransferInputProps = {
  options: OptionType[];
  onChange: (keys: Array<string>) => void;
  value: Array<any>;
  inputProps: Omit<TransferProps<OptionType>, 'targetKeys'> & {
    filterOption?: (filterText: string, item: OptionType) => boolean;
  };
};

const TransferInput: React.FC<TransferInputProps> = (props) => {
  const { value, options, onChange, inputProps } = props;

  const [internalValue, setInternalValue] = useState(props.value || []);
  useEffect(() => {
    setInternalValue(props.value || []);
  }, [value]);

  const handleChange = (keys: string[]) => {
    setInternalValue(keys);
    onChange(keys);
  };

  let dataSource = options.map((option) => ({ ...option, key: option.value }));

  return (
    // @ts-ignore
    <Transfer
      {...inputProps}
      dataSource={dataSource}
      targetKeys={internalValue}
      render={(item) => item.label}
      onChange={handleChange}
    />
  );
};

export default TransferInput;
