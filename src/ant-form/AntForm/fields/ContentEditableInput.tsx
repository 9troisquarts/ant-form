import React, { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";

type ContentEditableOptions = {
  tagName?: string;
  className?: string;
  style?: React.CSSProperties;
}

type ContentEditableInputProps = {
  /**
   *  Name of attribute
  */
  name: string;
  value: string;
  onChange: (value: string) => void;
  inputProps?: ContentEditableOptions;
};

const sanitizeConf = {
    allowedTags: ["br", "div"],
  };


const ContentEditableInput: React.FC<ContentEditableInputProps> = props => {
  const {
    value,
    inputProps = {} as ContentEditableOptions,
    onChange,
  } = props;
  const {
    tagName = 'div',
    className = '',
    style,
  } = inputProps;

  const [internalValue, setInternalValue] = useState<string>(sanitizeHtml(value || '', sanitizeConf));

  useEffect(() => {
    setInternalValue(value || '')
  }, [value])

  const handleChange = (evt: any) => {
    const nextValue = sanitizeHtml(evt.target.value || '', sanitizeConf);
    setInternalValue(nextValue);
    onChange(nextValue);
  }

  return (
    // @ts-ignore
    <ContentEditable
      style={(style || {})}
      html={internalValue}
      onChange={handleChange}
      tagName={tagName}
      className={`ant-form-contenteditable ${className}`}
    />
  )
}

export default ContentEditableInput;
