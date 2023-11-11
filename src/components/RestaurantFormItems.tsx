import { Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC, ReactElement, useState, useEffect } from "react";

interface Props {}

const RestaurantFormItems: FC<Props> = ({}): ReactElement => {
  return (
    <div>
      <Form.Item
        rules={[{ required: true }]}
        name="id"
        style={{ display: "none" }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="name"
        label="Name of restaurant"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="description"
        label="Description of restaurant"
      >
        <TextArea rows={5} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="priceOfDelivery"
        label="Price of delivery"
      >
        <InputNumber step={0.01} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name="priceOfOrderForFreeDelivery"
        label="Price of order for free delivery"
      >
        <InputNumber step={0.01} />
      </Form.Item>
    </div>
  );
};

export default RestaurantFormItems;
