import React, { useState, useEffect } from 'react';
import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor, TrixEditorProps } from "react-trix";

export type AntFormTrixEditorProps = {
  value: string | any
  inputProps?: TrixEditorProps;
  onChange: (value: string | any) => void
}

export const AntFormTrixEditor: React.FC<AntFormTrixEditorProps> = props => {
  const {
    value,
    inputProps,
    onChange,
  } = props;

  const [internalValue, setInternalValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (value !== undefined) setInternalValue(value || '')
  }, [value])

  if(!internalValue && typeof internalValue !== "string") return null;

  const handleChange = (value) => {
    onChange(value);
    setInternalValue(value);
  }

  console.log(internalValue)
  return (
    <TrixEditor
      {...inputProps}
      mergeTags={[]}
      autoFocus
      onChange={handleChange}
      value={internalValue}
    />
  )
}

export default AntFormTrixEditor
