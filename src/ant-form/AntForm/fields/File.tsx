import React, { useContext, useEffect, useRef, useState } from 'react';
import truncate from 'lodash/truncate';
import { Button, Dropdown, Space } from 'antd';
import { UploadOutlined, DeleteOutlined, DownloadOutlined, FileOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/es/button';
import ConfigurationContext from '../ConfigurationContext';
import dayjs from 'dayjs';

type IProps = {
  onChange: (files: Array<any> | any) => void;
  onRemove?: (index?: number) => void;
  value: Array<any>;
  readOnly?: boolean;
  defaultFileList?: any[];
  multiple?: boolean;
  showDate?: boolean;
  buttonProps?: ButtonProps;
  emptyText?: string;
  addButtonProps?: {
    text?: string;
  } & ButtonProps;
};

const Ellipsis = () => (
  <svg width="4" height="15" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M-3.93403e-07 9C-3.76112e-07 9.39556 0.117298 9.78224 0.337061 10.1111C0.556823 10.44 0.869181 10.6964 1.23463 10.8478C1.60009 10.9991 2.00222 11.0387 2.39018 10.9616C2.77814 10.8844 3.13451 10.6939 3.41421 10.4142C3.69392 10.1345 3.8844 9.77814 3.96157 9.39018C4.03874 9.00222 3.99913 8.60008 3.84776 8.23463C3.69638 7.86918 3.44004 7.55682 3.11114 7.33706C2.78224 7.1173 2.39556 7 2 7C1.46957 7 0.960859 7.21071 0.585786 7.58579C0.210714 7.96086 -4.16588e-07 8.46957 -3.93403e-07 9ZM-8.74228e-08 16C-7.01322e-08 16.3956 0.117298 16.7822 0.337061 17.1111C0.556824 17.44 0.869181 17.6964 1.23463 17.8478C1.60009 17.9991 2.00222 18.0387 2.39018 17.9616C2.77814 17.8844 3.13451 17.6939 3.41421 17.4142C3.69392 17.1345 3.8844 16.7781 3.96157 16.3902C4.03874 16.0022 3.99913 15.6001 3.84776 15.2346C3.69638 14.8692 3.44004 14.5568 3.11114 14.3371C2.78224 14.1173 2.39556 14 2 14C1.46957 14 0.960859 14.2107 0.585787 14.5858C0.210714 14.9609 -1.10609e-07 15.4696 -8.74228e-08 16ZM-6.99382e-07 2C-6.82092e-07 2.39556 0.117297 2.78224 0.33706 3.11114C0.556823 3.44004 0.869181 3.69638 1.23463 3.84776C1.60009 3.99913 2.00222 4.03874 2.39018 3.96157C2.77814 3.8844 3.13451 3.69392 3.41421 3.41421C3.69392 3.13451 3.8844 2.77814 3.96157 2.39018C4.03874 2.00222 3.99913 1.60008 3.84776 1.23463C3.69638 0.869181 3.44004 0.556824 3.11114 0.337061C2.78224 0.117298 2.39556 -1.04713e-07 2 -8.74228e-08C1.46957 -6.42368e-08 0.960859 0.210714 0.585786 0.585787C0.210713 0.960859 -7.22568e-07 1.46957 -6.99382e-07 2Z"
      fill="#0F0F0F"
    />
  </svg>
);

export const renderFile = (
  file: any,
  {
    remove = undefined,
    showDate = false,
    index = 0,
  }: { remove?: any; showDate?: boolean; index?: number },
  props = {},
) => {
  const isAttached = file.hasOwnProperty('__typename');
  const items = [
    isAttached && {
      key: 'download',
      label: 'Télécharger',
      onClick: () => window.open(file.url),
      icon: <DownloadOutlined />,
    },
    (!isAttached || file.canDestroy) &&
      remove && {
        key: 'remove',
        label: 'Supprimer',
        onClick: () => remove(file),
        danger: true,
        icon: <DeleteOutlined />,
      },
  ];
  return (
    <span
      key={isAttached ? file.id : index}
      className={`ant-form-file-input-file-item lighten-background`}
      {...props}
    >
      <Space>
        <span className={`ant-form-file-input-file-item--icon path-main-color`}>
          <FileOutlined />
        </span>
        <span className={`ant-form-file-input-file-item--title main-color`}>
          {file?.name || file?.filename
            ? truncate(file.name || file.filename, { length: 30, omission: '...' })
            : null}
          {showDate && file?.createdAt && (
            <div className={'ant-form-file-input-file-item--timestamps'}>
              {dayjs(file.createdAt).format('LLL')}
            </div>
          )}
        </span>
        {items.length > 0 && (
          <Dropdown menu={{ items }}>
            <a className={`ant-form-file-input-file-item--dropdown-toggler path-main-color`}>
              <Ellipsis />
            </a>
          </Dropdown>
        )}
      </Space>
    </span>
  );
};

const FileInput: React.FC<IProps> = (props) => {
  const {
    readOnly = false,
    onChange,
    value,
    multiple = false,
    showDate = false,
    addButtonProps,
    emptyText,
  } = props;
  const inputRef = useRef();
  const config = useContext(ConfigurationContext);
  const [defaultFileList, setDefaultFileList] = useState(props.defaultFileList);
  const [internalValue, setInternalValue] = useState(
    Array.isArray(props.value || []) ? props.value || [] : [props.value],
  );

  useEffect(() => {
    setInternalValue(Array.isArray(props.value || []) ? props.value || [] : [props.value]);
  }, [value]);

  useEffect(() => {
    setDefaultFileList(props.defaultFileList);
  }, [defaultFileList]);

  const onRemove = (file: any) => {
    const fileList = internalValue || [];
    if (multiple) {
      const isAttached = file && file.id;
      const index = fileList.findIndex((f) => (isAttached ? f.id === file.id : f.uid === file.uid));
      const nextFileList = fileList.slice();
      if (props.onRemove && isAttached) props.onRemove(file);
      nextFileList.splice(index, 1);
      onChange(nextFileList);
      setInternalValue(nextFileList.length > 0 ? nextFileList : []);
    } else {
      onChange(undefined);
      if (props.onRemove) props.onRemove();
      setInternalValue([]);
    }
  };

  if (
    readOnly &&
    ((multiple && (defaultFileList || []).length === 0) || internalValue.length === 0)
  ) {
    return <div className="is-muted">{emptyText || config?.file?.emptyText || 'No file'}</div>;
  }

  const onFileChange = (e: any) => {
    const files = e.target.files;
    const nextFileList = [...files, ...internalValue];
    if (multiple) {
      setInternalValue([...files, ...internalValue]);
      onChange([...files, ...internalValue]);
    } else {
      setInternalValue([nextFileList[0]]);
      onChange(nextFileList[0]);
    }
  };

  const onAddClick = () => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.click();
    }
  };

  const fileList = [...internalValue, ...(defaultFileList || [])];

  const { children: addText, className = '' } = addButtonProps || {};

  return (
    <>
      {!readOnly && (
        // @ts-ignore
        <input
          onChange={onFileChange}
          type="file"
          multiple={multiple}
          style={{ display: 'none' }}
          // @ts-ignore
          ref={inputRef}
        />
      )}
      <Space direction="vertical" style={{ width: '100%' }}>
        {!readOnly && (internalValue.length === 0 || multiple) && (
          <>
            <Button
              onClick={onAddClick}
              icon={<UploadOutlined />}
              {...(addButtonProps || {})}
              className={`${
                addButtonProps?.className || ''
              } ant-form-file-input-add-button tenant-border lighten-background`}
            >
              {addText || config?.file?.addButtonText || 'Add a file'}
            </Button>
          </>
        )}
        {fileList && (
          <div>
            <Space wrap>
              {(fileList || []).map((f, i) =>
                renderFile(f, { remove: onRemove, index: i, showDate }, {}),
              )}
            </Space>
          </div>
        )}
      </Space>
    </>
  );
};

export default FileInput;
