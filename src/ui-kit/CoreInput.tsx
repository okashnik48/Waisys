import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
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

export const CoreInput = ({
  label,
  type = "text",
  size,
  prefix,
  placeholder = "Enter Response",
  ...rest
}: Props) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <Controller
        name={rest.name}
        control={rest.control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            size={size}
            type={type}
            placeholder={placeholder}
            prefix={prefix}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
          />
        )}
      />
    </div>
  );
};
