import { Button, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React, { useContext, useEffect, useState } from 'react';
import nl2br from '../../_utils/nl2br';
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
    onplace,
    loading,
    editingField,
    setEditingField,
    submitText = 'Ok',
    cancelText = 'Cancel',
  } = useContext(OnPlaceEditContext);

  const [inputValue, setInputValue] = useState(value);

  const [inputBlur, setInputBlur] = useState(false);
  const [actionClicked, setActionClicked] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputBlur) {
      setTimeout(() => {
        if (inputBlur) {
          if (!actionClicked) {
            setEditingField(undefined);
          } else {
            setActionClicked(false);
          }
          setInputBlur(false);
        }
      }, 50);
    }
  }, [inputBlur]);

  /*
   * Functions
   */

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value } : value;
    if (onplace) {
      setInputValue(nextValue);
    } else {
      onChange(nextValue);
    }
  };

  const onEditing = () => {
    setEditingField(name);
  };

  const onSubmit = () => {
    setInputBlur(false);
    setActionClicked(true);
    onChange(inputValue);
    setEditingField(undefined);
  };

  const onCancel = () => {
    setInputBlur(false);
    setActionClicked(true);
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
      {onplace ? (
        <>
          {name == editingField ? (
            <div className="ant-form-onplace-input-container">
              <Input.TextArea
                {...(inputProps || {})}
                readOnly={readOnly}
                // @ts-ignore
                value={inputValue}
                onChange={handleChange}
                autoSize
              />
              <div className="ant-form-on-place-edit-field-actions">
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
              {nl2br(inputValue && inputValue?.toString()?.trim() !== '' ? inputValue : '-')}
            </div>
          )}
        </>
      ) : (
        <Input.TextArea
          {...(inputProps || {})}
          readOnly={readOnly}
          // @ts-ignore
          value={inputValue}
          onChange={handleChange}
          autoSize
        />
      )}
    </>
  );
};

export default TextArea;
