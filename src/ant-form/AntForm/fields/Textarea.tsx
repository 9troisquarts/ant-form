import { Button, Input, Space } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React, { useContext, useEffect, useState } from 'react';
import nl2br from '../../_utils/nl2br';
import { InPlaceEditContext } from '../providers/inPlaceEdit';

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

  const {
    inPlace,
    loading,
    editingField,
    setEditingField,
    submitText = 'Ok',
    cancelText = 'Cancel',
  } = useContext(InPlaceEditContext);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    const nextValue = localize && locale ? { ...props.value, [locale]: value } : value;
    if (inPlace)
      setInputValue(nextValue);
    else
      onChange(nextValue);
  };

  let v = inPlace ? inputValue : value;
  if (localize && locale && v) {
    v = v.hasOwnProperty(locale) && v[locale] ? v[locale] : undefined;
  }

  if (inPlace) {
    const editing = name === editingField;

    if (editing && !readOnly) {
      const onSubmit = () => {
        onChange(inputValue);
        setEditingField(undefined);
      };

      const onCancel = () => {
        setInputValue(value);
        setEditingField(undefined);
      };

      const onKeyDown = (e) => {
        if (editing && e.keyCode === 13 && e.shiftKey) onSubmit();
        if (editing && e.keyCode === 27) onCancel();
      }

      return (
        <div className="ant-form-InPlace-input-container">
          <Input.TextArea
            {...(inputProps || {})}
            // @ts-ignore
            value={v}
            autoFocus
            onKeyDown={onKeyDown}
            onChange={handleChange}
            autoSize
          />
          <div className="ant-form-on-place-edit-field-actions">
            <Space>
              <Button onClick={onCancel} disabled={loading}>
                {cancelText}
              </Button>
              <Button type="primary" onClick={onSubmit} disabled={loading} loading={loading}>
                {submitText}
              </Button>
            </Space>
          </div>
        </div>
      )
    }

    const onEditing = () => setEditingField(name)
    return (
      <div onClick={onEditing}>
        {nl2br(v && v?.toString()?.trim() !== '' ? v : '-')}
      </div>
    )
  }

  return (
    <Input.TextArea
      {...(inputProps || {})}
      readOnly={readOnly}
      // @ts-ignore
      value={v}
      onChange={handleChange}
      autoSize
    />
  );
};

export default TextArea;
