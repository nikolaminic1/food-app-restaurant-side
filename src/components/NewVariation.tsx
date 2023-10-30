import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ProductVariationImage from "./ProductVariationImage";
import { MainVariationCardDiv } from "../style/products";

interface VariationNewProps {
  name: string;
  deleteVariation: () => void;
  newVariation: boolean;
}

const VariationNew: FC<VariationNewProps> = ({
  name,
  deleteVariation,
  newVariation,
}): ReactElement => {
  const run = useRef(false);

  // should add false and tru state in order to track if values are populated before and after exuction of useEffect and to fix this shit

  // should add invisible form item in order to store id of variation and then send it with its own id so it can be changed

  useEffect(() => {
    // values.length = 0;
    console.log(newVariation);

    if (run.current === false) {
    }
    if (newVariation == true) {
    }

    return () => {
      run.current = true;
    };
  }, []);

  return (
    <MainVariationCardDiv>
      <div className="title">
        <h3>
          <Form.Item
            labelAlign="left"
            wrapperCol={{ sm: 6 }}
            labelCol={{ sm: 24 }}
            label="Ime varijacije"
            initialValue={name}
            name={"variation"}
          >
            <Input />
          </Form.Item>

          <span>
            <Button
              style={
                {
                  // marginLeft: "30px",
                }
              }
              onClick={deleteVariation}
              danger
            >
              Delete variation
            </Button>
          </span>
        </h3>
      </div>
      <div className="product-variations">
        <Divider />
        {
          <Form.List name={"new_product_variations"}>
            {(fields, { add, remove }, { errors }) => {
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <div key={key}>
                        <Space
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            labelAlign="left"
                            wrapperCol={{ sm: 24 }}
                            labelCol={{ sm: 24 }}
                            style={{ width: "240px" }}
                            {...restField}
                            name={[name, "value"]}
                            label="Value"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            labelAlign="left"
                            wrapperCol={{ sm: 24 }}
                            labelCol={{ sm: 24 }}
                            style={{ width: "240px" }}
                            {...restField}
                            name={[name, "code_of_variation"]}
                            label="Code"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            labelAlign="left"
                            wrapperCol={{ sm: 24 }}
                            labelCol={{ sm: 24 }}
                            style={{ width: "150px" }}
                            {...restField}
                            name={[name, "price_of_variation"]}
                            label="Price"
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              min={0}
                              defaultValue={0}
                              step={0.01}
                            />
                          </Form.Item>

                          <Form.Item
                            labelAlign="left"
                            wrapperCol={{ sm: 24 }}
                            labelCol={{ sm: 24 }}
                            style={{ width: "150px" }}
                            {...restField}
                            name={[name, "price_of_variation_discount"]}
                            label="Price - discount"
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              min={0}
                              defaultValue={0}
                              step={0.01}
                            />
                          </Form.Item>

                          <Form.Item
                            labelAlign="left"
                            wrapperCol={{ sm: 24 }}
                            labelCol={{ sm: 24 }}
                            {...restField}
                            name={[name, "does_affect_price"]}
                            label="Does affect price ?"
                            valuePropName="checked"
                          >
                            <Checkbox />
                          </Form.Item>

                          <Form.Item
                            labelAlign="left"
                            wrapperCol={{ sm: 24 }}
                            labelCol={{ sm: 24 }}
                            {...restField}
                            name={[name, "is_on_discount"]}
                            label="Is it on discount ?"
                            valuePropName="checked"
                          >
                            <Checkbox />
                          </Form.Item>

                          <ProductVariationImage
                            restField={restField}
                            name={name}
                          />

                          <Form.Item
                            {...restField}
                            name={[name, "id"]}
                            valuePropName="id"
                            style={{ display: "none" }}
                          >
                            <InputNumber />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                        <Divider />
                      </div>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        }
      </div>
    </MainVariationCardDiv>
  );
};

export default VariationNew;
