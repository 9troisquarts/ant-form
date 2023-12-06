import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { InPlaceEditContext } from '../providers/inPlaceEdit';
import { StringInput } from '../types';

type InputStringProps = {
  name: string;
  value?: string | any;
  localize?: boolean;
  locale?: string;
  onChange: (value: string) => void;
  inputProps?: StringInput;
};

type InternalProps = {
  readOnly?: boolean;
};

const InputString: React.FC<InputStringProps> = (props: InputStringProps & InternalProps) => {
  const { inputProps, onChange, localize = false, readOnly = false, locale, value, name } = props;

  const [inputValue, setInputValue] = useState(value);
  const { inPlace, editingField, setEditingField } = useContext(InPlaceEditContext);

  useEffect(() => {
    if (inPlace) setInputValue(value);
  }, [value]);

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value } : value;
    if (inPlace) setInputValue(nextValue);
    else onChange(nextValue);
  };

  let v = inPlace ? inputValue : value;
  if (localize && locale && v) {
    v = v.hasOwnProperty(locale) && v[locale] ? v[locale] : undefined;
  }

  if (inPlace) {
    const editing = name === editingField;

    if (editing && !readOnly) {
      const onBlur = () => {
        setEditingField(undefined);
        onChange(inputValue);
      };

      const onCancel = () => {
        setEditingField(undefined);
        setInputValue(value);
      };

      const onKeyDown = (e: any) => {
        if (editing && e.keyCode === 13) onBlur();
        if (editing && e.keyCode === 27) onCancel();
      };

      return (
        <div className="ant-form-InPlace-input-container" onBlur={onBlur}>
          <Input
            {...inputProps}
            value={v}
            onKeyDown={onKeyDown}
            onChange={handleChange}
            autoFocus
          />
        </div>
      );
    }
    return (
      <div className="ant-form-on-place-edit-field-value" onClick={() => setEditingField(name)}>
        {v && v?.toString()?.trim() !== '' ? v : '-'}
      </div>
    );
  }

  return (
    <Input name={name} {...inputProps} value={v} readOnly={readOnly} onChange={handleChange} />
  );
};

export default InputString;
