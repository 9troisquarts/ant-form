import React from 'react';
import isArray from 'lodash/isArray';
import { Upload, Button } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/es/button';
import { RcFile, UploadFile } from 'antd/es/upload/interface';

type IProps = {
  onChange: (files: Array<any> | any) => void;
  addComponent?: () => React.ReactNode;
  onRemove?: (index?: number) => void;
  value: Array<any>;
  readOnly?: boolean;
  buttonProps?: ButtonProps;
} & UploadProps;

type State = {
  value?: UploadFile<any> | UploadFile<any>[] | null;
};
class UploadInput extends React.Component<any> {
  state: Readonly<State> = {
    value: [],
  };

  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || (props.multiple ? [] : null),
    };
  }

  static getDerivedStateFromProps(nextProps: any) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value ? { value: nextProps.value } : {}),
      };
    }
    return null;
  }

  render() {
    const {
      readOnly = false,
      value,
      buttonProps = {},
      onChange,
      addComponent,
      placeholder,
      multiple = false,
      ...rest
    } = this.props;

    const beforeUpload = (file: RcFile) => {
      this.setState((state: State) => {
        const nextValue = multiple
          ? [...((state.value as Array<UploadFile>) || []), file]
          : [file];
        onChange(multiple ? nextValue : nextValue[0]);
        return {
          ...state,
          value: nextValue,
        };
      });
      return false;
    };

    const onRemove = (file: UploadFile) => {
      this.setState((state: State) => {
        const fileList = (state.value || []) as Array<UploadFile>;
        if (multiple) {
          const index = fileList.findIndex(f => f.uid === file.uid);
          const nextFileList = fileList.slice();
          if(this.props.onRemove) this.props.onRemove(index);
          nextFileList.splice(index, 1);
          onChange(nextFileList);
          return {
            value: nextFileList,
          };
        } else {
          onChange(undefined);
          if(this.props.onRemove) this.props.onRemove();
          return {
            value: undefined,
          }
        }
      });
      return false;
    };

    let v = this.state.value;
    if (v) {
      if (!isArray(v)) v = [v as UploadFile<any>];
    } else {
      v = [];
    }

    return (
      <Upload
        {...rest}
        multiple={multiple}
        fileList={v as UploadFile<any>[]}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
      >
        {!readOnly && (
          <>
            {addComponent ? (
              addComponent
            ) : (
              <Button icon={<UploadOutlined />} {...buttonProps}>
                {placeholder || 'Select file'}
              </Button>
            )}
          </>
        )}
      </Upload>
    );
  }
}

export default UploadInput;
