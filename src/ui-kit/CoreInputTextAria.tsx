import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type Props = {
  label: string;
  control: any;
  name: string;
  rules?: Record<string, any>;
  placeholder: string;
  size: SizeType;
  prefix?: ReactNode;
  type: string;
}

export const CoreInputTextAria = ({
  label,
  size,
  placeholder = "Enter Response",
  ...rest
}: Props) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      

      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field, fieldState }) => (
          <Input.TextArea
            {...field}
            size={size}
            placeholder={placeholder}
            autoSize = {true}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
          />
        )}
      />
    </div>
  );
};
