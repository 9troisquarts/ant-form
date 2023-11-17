import React, { useEffect, useState } from 'react';
import { Transfer, TransferProps } from 'antd';

type OptionType = { label: string; value?: string; key: string; description?: string };

type TransferInputProps = {
  options: OptionType[];
  onChange: (keys: Array<string>) => void;
  value: Array<any>;
  inputProps: {
    filterOption: OptionType;
  } & Omit<TransferProps<OptionType[]>, 'targetKeys'>;
};

const TransferInput: React.FC<TransferInputProps> = (props) => {
  const { value, options, onChange, inputProps } = props;

  const [internalValue, setInternalValue] = useState(props.value || []);
  useEffect(() => {
    setInternalValue(props.value || []);
  }, [value]);

  const handleChange = (keys) => {
    setInternalValue(keys);
    onChange(keys);
  };

  let dataSource = options.map((option) => ({ ...option, key: option.value }));

  return (
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
