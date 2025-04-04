import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Form, Input, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type Props = {
  control: any;
  name: string;
  rules?: {
    required: boolean,
    message: string
  }[];
  placeholder: string;
  size: SizeType;
  options: {
    label: string;
    value: string;
  }[]
}

export const CoreSelect = ({
  size,
  placeholder = "Додати відповідь",
  options,
  ...rest
}: Props) => {
  return (
    <div className="input-container">
      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field, fieldState }) => (
            <Form.Item
            name={rest.name}
            rules={rest.rules? rest.rules : []}
          >
          <Select
            {...field}
            size={size}
            placeholder={placeholder}
            options={options}
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
