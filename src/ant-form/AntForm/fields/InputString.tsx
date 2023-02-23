import { Button, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { OnPlaceEditContext } from '../providers/onPlaceEdit';
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

  /*
   * Hooks
   */

  const {
    loading,
    editingField,
    setEditingField,
    submitText = 'Ok',
    cancelText = 'Cancel',
  } = useContext(OnPlaceEditContext);

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  /*
   * Functions
   */

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value } : value;
    setInputValue(nextValue);
  };

  const onEditing = () => {
    setEditingField(name);
  };

  const onSubmit = () => {
    onChange(inputValue);
    setEditingField(undefined);
  };

  const onCancel = () => {
    setInputValue(value);
    setEditingField(undefined);
  };

  /*
   * Misc
   */

  let v = value;
  if (localize && locale && v) {
    v = v.hasOwnProperty(locale) && v[locale] ? v[locale] : undefined;
  }

  /*
   * Render
   */

  return (
    <>
      {name == editingField ? (
        <div className="ant-form-onplace-input-container">
          <Input {...inputProps} value={inputValue} readOnly={readOnly} onChange={handleChange} />
          <div className="ant-form-onplace-input-actions">
            <Button type="primary" onClick={onSubmit} disabled={loading} loading={loading}>
              {submitText}
            </Button>
            <Button onClick={onCancel} disabled={loading}>
              {cancelText}
            </Button>
          </div>
        </div>
      ) : (
        <div onClick={onEditing}>
          {inputValue && inputValue?.toString()?.trim() !== '' ? inputValue : '-'}
        </div>
      )}
    </>
  );
};

export default InputString;
