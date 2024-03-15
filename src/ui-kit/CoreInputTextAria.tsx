import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";

export type Props = {
  label: string;
  control: any;
  name: string;
  rules?: Rule[];
  placeholder: string;
  size: SizeType;
  prefix?: ReactNode;
  type: string;
};

export const CoreInputTextAria = ({
  label,
  size,
  placeholder = "Enter Response",
  ...rest
}: Props) => {
  return (
    <Form.Item name={rest.name} rules={rest.rules ? rest.rules : []}>
      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field, fieldState }) => {
          console.log(field.value);
          return (
            
              <Input.TextArea
                {...field}
                size={size}
                placeholder={placeholder}
                autoSize={true}
                className={
                  fieldState.invalid ? "custom-input error" : "custom-input"
                }
              />
            
          );
        }}
      />
      </Form.Item>
  );
};
