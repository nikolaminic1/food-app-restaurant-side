import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import type { UploadProps } from "antd";
import { Image, Variation } from "../app/models/responseModels/restaurants";
import ProductVariationImage from "./ProductVariationImage";
import { MainVariationCardDiv } from "../style/products";

interface VariationCardProps {
  variation?: Variation;
  name: string;
  deleteVariation: () => void;
  newVariation: boolean;
}

const VariationCard: FC<VariationCardProps> = ({
  variation,
  name,
  deleteVariation,
  newVariation,
}): ReactElement => {
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

  const run = useRef(false);

  // should add false and tru state in order to track if values are populated before and after exuction of useEffect and to fix this shit

  let values: ListS[] = [];

  // should add invisible form item in order to store id of variation and then send it with its own id so it can be changed

  useEffect(() => {
    // values.length = 0;
    console.log(newVariation);

    if (run.current === false) {
      if (variation) {
        // console.log(values);
        variation?.productVariationList.forEach((element) => {
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
    if (newVariation == true) {
      // console.log(values);
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
            label="Ime varijacije"
            initialValue={name}
            name={"variation"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={variation?.id}
            name={"variation_id"}
            style={{ display: "none" }}
          >
            <InputNumber />
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
              Obriši varijaciju
            </Button>
          </span>
        </h3>
      </div>
      <div className="product-variations">
        <Divider />
        {values && (
          <Form.List initialValue={values} name={"product_variations"}>
            {(fields, { add, remove, move }, { errors }) => {
              // console.log(fields);

              return (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    console.log(key);
                    console.log(values[key]?.product_variation_image?.imageUrl);

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
                            label="Vrednost"
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
                            label="Kod varijacije"
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
                            label="Cena"
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
                            label="Cena - popust"
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
                            label="Da li utiče na cenu ?"
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
                            label="Da li je na popustu ?"
                            valuePropName="checked"
                          >
                            <Checkbox />
                          </Form.Item>

                          <ProductVariationImage
                            restField={restField}
                            name={name}
                            file={values[key]?.product_variation_image}
                          />

                          {/* checkbox does not have value in form */}
                          {/* <Form.Item
                          labelAlign="left"
                          wrapperCol={{ sm: 24 }}
                          labelCol={{ sm: 24 }}
                          {...restField}
                          name={[name, "does_affect_price"]}
                          label="Da li utiče na cenu ?"
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item> */}
                          <Form.Item
                            {...restField}
                            name={[name, "id"]}
                            valuePropName="id"
                            style={{ display: "none" }}
                          >
                            <InputNumber />
                          </Form.Item>

                          <MinusCircleOutlined
                            onClick={() => {
                              // list_to_delete.push()

                              console.log(
                                fields.find(
                                  (field: any) =>
                                    field.key == Number(key.toFixed(0))
                                )
                              );

                              remove(name);
                            }}
                          />
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
                      Dodaj polje{" "}
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

export default VariationCard;
