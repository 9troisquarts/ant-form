import React, { useState, useEffect } from 'react';
import { GithubPicker, ChromePicker, BlockPicker } from "react-color";
import { Popover, Tooltip } from "antd";
import "./ant-form-color-picker.css";

type AntFormColorPickerOptions = {
  size?: 'small' | 'default';
  type?: 'chrome' | 'github' | 'block';
  colors?: string[];
}

export type AntFormColorPickerProps = {
  value: string;
  onChange: (value: string | any) => void;
  inputProps: AntFormColorPickerOptions;
};

export const AntFormColorPicker: React.FC<AntFormColorPickerProps> = props => {
  const {
    value,
    inputProps = {},
    onChange,
  } = props;

  const {
    type = "chrome",
    size = "default",
    colors,
  } = inputProps as AntFormColorPickerOptions;

  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(value || null);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleGithubChange = (value) => {
    if(value?.hex) {
      const { hex } = value;
      setColor(hex);
      setVisible(false);
      onChange(hex);
    }
  }

  const handleChange = (value) => {
    const { hex } = value;
    setColor(hex);
    onChange(hex);
  }

  const handleVisibleChange = (visible: boolean) => setVisible(visible);

  const swatch = (
    <div className="ant-form-colorpicker-swatch">
      <div
        className={size === "small" ? "ant-form-colorpicker-small-size" : "ant-form-colorpicker-default-size"}
        style={{ backgroundColor: color }}
      />
    </div>
  );

  return (
    <Tooltip
      placement="leftTop"
      title={color || ""}
    >
      <Popover
          trigger="click"
          overlayClassName={"ant-form-colorpicker-popover"}
          visible={visible}
          onVisibleChange={handleVisibleChange}
          content={(
            <div className="ant-form-colorpicker-container">
              {(!type || type === "chrome") && (
                <div className="ant-form-colorpicker-chrome-container">
                  <ChromePicker
                    color={color || ""}
                    triangle={null}
                    onChangeComplete={handleChange}
                  />
                </div>
              )}
              {(type === "github" && (
                  <GithubPicker
                    color={color || ""}
                    colors={colors}
                    triangle={null}
                    onChangeComplete={handleGithubChange}
                  />
                ))}
              {(type === "block" && (
                  <div>
                    <BlockPicker
                      color={color || ""}
                      colors={colors}
                      triangle="hide"
                      onChangeComplete={handleChange}
                    />
                  </div>
                ))}
            </div>
          )}
        >
          {swatch}
        </Popover>
    </Tooltip>
  )
}

export default AntFormColorPicker;
