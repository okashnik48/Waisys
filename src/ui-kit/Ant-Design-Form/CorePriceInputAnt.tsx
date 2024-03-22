import { Form, Select } from "antd";
import React from "react";

export const suffixSelector = (
  <Form.Item name="currency" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="USD">USD</Select.Option>
      <Select.Option value="EUR">EUR</Select.Option>
      <Select.Option value="GBP">GBP</Select.Option>
      <Select.Option value="CNY">CNY</Select.Option>
      <Select.Option value="UAH">UAH</Select.Option>
    </Select>
  </Form.Item>
);
