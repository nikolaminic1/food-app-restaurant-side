import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC, ReactElement, useState, useEffect } from "react";

interface Props {}

const FormInfoItems: FC<Props> = ({}): ReactElement => {
  return (
    <div>
      <Form.Item name="product_id" label="ID" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="name_of_product"
        label="Name of product"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="code_of_product"
        label="Product code"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="about_product"
        label="About product"
      >
        <TextArea rows={5} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="price_of_product"
        label="Price of product"
      >
        <InputNumber style={{ width: "200px" }} min={1} step={0.1} />
      </Form.Item>
      <Form.Item
        // rules={[{ required: true }]}
        name="discount_price"
        label="Discount price"
      >
        <InputNumber style={{ width: "200px" }} min={1} step={0.1} />
      </Form.Item>
      <Form.Item
        // rules={[{ required: true }]}
        name="is_on_discount"
        label="Is on discount"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="preparation_time"
        label="Preparation time"
      >
        <InputNumber style={{ width: "200px" }} min={1} step={1} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="availability"
        label="Availability"
      >
        <Select
          options={[
            { value: "available", label: "Available" },
            {
              value: "not_available",
              label: "Not available",
            },
          ]}
          style={{ width: "200px" }}
        />
      </Form.Item>
    </div>
  );
};

export default FormInfoItems;
