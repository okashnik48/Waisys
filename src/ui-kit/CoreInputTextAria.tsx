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

export const CoreInputTextArea = ({
  label,
  size,
  placeholder = "Enter Response",
  ...rest
}: Props) => {
  return (
    <Controller
      name={rest.name}
      control={rest.control}
      render={({ field, fieldState }) => {
        return (
          <>
<Input.TextArea
  // required
  size={size}
  placeholder={placeholder}
  autoSize={true}
  status={fieldState.error ? "error" : ""}
  className={
    fieldState.invalid ? "custom-input error" : "custom-input"
  }
  {...field}
/>
{fieldState.error && (
  <div style={{ color: "red", marginTop: "5px" }}>{fieldState.error.message}</div>
)}

          </>
        );
      }}
    />
  );
};
