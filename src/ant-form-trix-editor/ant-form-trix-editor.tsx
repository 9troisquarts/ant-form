import React from 'react';
import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor, TrixEditorProps } from "react-trix";

export type AntFormTrixEditorProps = {
  value: string | any
  inputProps?: TrixEditorProps;
  onChange: (value: string | any) => void
}

const AntFormTrixEditor: React.FC<AntFormTrixEditorProps> = props => {
  const {
    value,
    inputProps,
    onChange,
  } = props;

  const handleChange = (value: string) => {
    onChange(value);
  }

  return (
    <TrixEditor
      {...inputProps}
      className={`ant-form-trix-editor ${inputProps?.className || ''}`}
      mergeTags={[]}
      onChange={handleChange}
      value={value || ''}
    />
  )
}

export default AntFormTrixEditor
