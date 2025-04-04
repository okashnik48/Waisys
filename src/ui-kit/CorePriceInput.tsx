import { Form, InputNumber, Select } from "antd";
import React, { useState } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { Controller, useController } from "react-hook-form";
import { Props } from "./CoreInputTextAria";

export const CurrencyOptions1: ReadonlyArray<CurrencyInputProps["intlConfig"]> =
  [
    {
      locale: "de-DE",
      currency: "EUR",
    },
    {
      locale: "en-US",
      currency: "USD",
    },
    {
      locale: "en-GB",
      currency: "GBP",
    },
    {
      locale: "ja-JP",
      currency: "JPY",
    },
    {
      locale: "en-IN",
      currency: "INR",
    },
  ];

export const CurrencyOptions: Record<string, string> = {
  UAH: "₴",
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
};
export const CorePriceInput = ({
  label,
  type = "text",
  size,
  prefix,
  placeholder = "Додати відповідь",
  ...rest
}: Props) => {
  return (
    <Form.Item 
    name={rest.name}
    rules={rest.rules? rest.rules : []}>
      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field, fieldState }) => {
          return (

              <InputNumber
                {...field}
                value={field.value.value}
                size={size}
                type={type}
                placeholder={placeholder}
                prefix={CurrencyOptions[field.value.currency]}
                style={{ width: "100%" }}
                onChange={(value) =>
                  field.onChange({ ...field.value, value: value })
                }
                addonAfter={
                  <Select
                    value={field.value.currency}
                    style={{ width: 80 }}
                    onChange={(value) =>
                      field.onChange({ ...field.value, currency: value })
                    }
                  >
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="GBP">GBP</Select.Option>
                    <Select.Option value="CNY">CNY</Select.Option>
                    <Select.Option value="UAH">UAH</Select.Option>
                  </Select>
                }
              />
            
          );
        }}
      />
      </Form.Item>
  );
};

export default CorePriceInput;
