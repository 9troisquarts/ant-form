import { Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import Editor from 'rich-markdown-editor';
import defaultDisabledExtensions from './disabledExtensions';

export type AntFormMarkdownEditorOptions = {
  disabledExtensions: string[];
};

export type AntFormMarkdownConfig = {
  placeholder: string;
  dictionary?: {
    [k: string]: string;
  };
};

export type AntFormMarkdownEditorProps = {
  value: string;
  onChange: (value: string | any) => void;
  inputProps: AntFormMarkdownEditorOptions;
  config?: AntFormMarkdownConfig;
};

export const AntFormRichMarkdownEditor: React.FC<AntFormMarkdownEditorProps> = (props) => {
  const { value, inputProps = {}, config, onChange } = props;
  const [editorValue, setEditorValue] = useState(value || undefined);

  const handleChange = (callback: any) => {
    const value = callback();
    setTimeout(() => {
      setEditorValue(value || undefined);
      onChange(value || undefined);
    }, 0);
  };

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const { disabledExtensions = defaultDisabledExtensions } =
    inputProps as AntFormMarkdownEditorOptions;

  const { placeholder, dictionary } = config as AntFormMarkdownConfig;

  return (
    <>
      <Divider style={{ marginTop: 0, marginBottom: 5 }} />
      <Editor
        // @ts-ignore
        disableExtensions={disabledExtensions}
        onChange={handleChange}
        defaultValue={editorValue}
        placeholder={placeholder}
        dictionary={dictionary}
      />
      <Divider style={{ marginTop: 5, marginBottom: 0 }} />
    </>
  );
};

export default AntFormRichMarkdownEditor;
