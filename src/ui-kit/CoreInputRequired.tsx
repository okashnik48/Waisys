import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";

type Props = {
  label: string;
  control: any;
  name: string;
  rules: Rule[];
  placeholder: string;
  size: SizeType;
  prefix?: ReactNode;
  type: string;
};

export const CoreInputRequired = ({
  label,
  type = "text",
  size,
  prefix,
  placeholder = "Відправити",
  ...rest
}: Props) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field, fieldState }) => (
          <Form.Item
            name={rest.name}
            rules={rest.rules}
          >
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
          </Form.Item>
        )}
      />
    </div>
  );
};
