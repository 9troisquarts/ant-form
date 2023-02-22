import React, { useState, useEffect } from 'react';
import { GithubPicker, ChromePicker, BlockPicker } from "react-color";
import { Popover, Tooltip } from "antd";
import "./ant-form-color-picker.css";

export interface AntFormColorPickerOptions {
  size?: 'small' | 'default';
  type?: 'chrome' | 'github' | 'block';
  colors?: string[];
}

export interface InternalProps {
  value: string;
  onChange: (value: string | any) => void;
};

export type AntFormColorPickerProps = {
  type: "color",
  inputProps: AntFormColorPickerOptions;
}

// @ts-ignore
export const AntFormColorPicker: React.FC<AntFormColorPickerProps> = (props: (AntFormColorPickerProps & InternalProps)) => {
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

  const handleGithubChange = (value: { hex: string }) => {
    if(value?.hex) {
      const { hex } = value;
      setColor(hex);
      setVisible(false);
      onChange(hex);
    }
  }

  const handleChange = (value: { hex: string }) => {
    const { hex } = value;
    setColor(hex);
    onChange(hex);
  }

  const handleVisibleChange = (visible: boolean) => setVisible(visible);

  const swatch = (
    <div className="ant-form-colorpicker-swatch">
      <div
        className={size === "small" ? "ant-form-colorpicker-small-size" : "ant-form-colorpicker-default-size"}
        style={{ backgroundColor: color || '#FFF' }}
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
          open={visible}
          onOpenChange={handleVisibleChange}
          content={(
            <div className="ant-form-colorpicker-container">
              {(!type || type === "chrome") && (
                <div className="ant-form-colorpicker-chrome-container">
                  <ChromePicker
                    color={color || ""}
                    onChangeComplete={handleChange}
                  />
                </div>
              )}
              {(type === "github" && (
                  <GithubPicker
                    color={color || ""}
                    colors={colors}
                    triangle='hide'
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
