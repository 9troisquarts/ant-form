import { Button, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React, { useContext, useEffect, useState } from 'react';
import { OnPlaceEditContext } from '../providers/onPlaceEdit';

type TextAreaInputProps = {
  type: 'text';
  name: string;
  localize?: boolean;
  /** https://ant.design/components/input/#Input.TextArea */
  inputProps: TextAreaProps;
};

type InternalProps = {
  value?: string | any;
  locale?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

// @ts-ignore
const TextArea: React.FC<TextAreaInputProps> = (props: TextAreaInputProps & InternalProps) => {
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
          <Input.TextArea
            {...(inputProps || {})}
            readOnly={readOnly}
            value={inputValue}
            onChange={handleChange}
          />
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

export default TextArea;
