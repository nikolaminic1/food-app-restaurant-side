import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { Image, Variation } from "../app/models/responseModels/restaurants";
import { MainVariationCardDiv } from "../style/products";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Space,
} from "antd";
import ProductVariationImage from "./ProductVariationImage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  deleteVariation: () => void;
  variation: Variation | undefined;
}

const VariationExisting: FC<Props> = ({ variation }): ReactElement => {
  console.log(variation);

  interface ListS {
    id: number;
    value: string;
    price_of_variation: number;
    price_of_variation_discount: number;
    is_on_discount: boolean;
    does_affect_price: boolean;
    code_of_variation: string;
    product_variation_image: Image;
  }
  let values: ListS[] = [];

  const run = useRef(false);

  useEffect(() => {
    // values.length = 0;
    console.log(variation);

    if (run.current === false) {
      if (variation) {
        // console.log(values);
        variation?.productVariationList.forEach((element: any) => {
          // console.log(element);

          values.push({
            value: element.value,
            price_of_variation: element.priceOfVariation,
            code_of_variation: element.codeOfVariation,
            price_of_variation_discount: element.priceOfVariationDiscount,
            is_on_discount: element.isOnDiscount,
            does_affect_price: element.doesAffectPrice,
            product_variation_image: element.image,
            id: element.id,
          });
        }, []);
      }
    }

    // console.log(values);

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
            label="Variation name"
            initialValue={name}
            name={"variation"}
            className="mt-4"
          >
            <Input />
          </Form.Item>
        </h3>
      </div>
      <div className="product-variations">
        <Divider />
        {values && (
          <Form.List initialValue={values} name={"product_variations"}>
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
        )}
      </div>
    </MainVariationCardDiv>
  );
};

export default VariationExisting;
