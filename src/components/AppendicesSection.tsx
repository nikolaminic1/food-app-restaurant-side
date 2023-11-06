import React, { FC, ReactElement, useState, useEffect } from "react";
import { MainDivAppendices } from "../style/products";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { AppendicesCategory } from "../app/models/responseModels/restaurants";

interface Props {
  form: FormInstance;
  // appendices: AppendicesCategory[];
}

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
};

const AppendicesSection: FC<Props> = ({ form }): ReactElement => {
  interface AppendicesItem {
    name: string;
    price: number;
    affect_price: boolean;
  }
  interface AppendicesCategoryItem {
    id: number;
    name: string;
    required: boolean;
    number_allowed: number;
    appendices: AppendicesItem[];
  }
  useEffect(() => {
    console.log(form.getFieldValue("appendicesCategoryList"));
  }, []);
  return (
    <>
      {form.getFieldValue("appendicesCategoryList") && (
        <MainDivAppendices className="col-lg-6 col-12">
          <h4 className="mb-3">Appendices</h4>

          <Form.List
            initialValue={form.getFieldValue("appendicesCategoryList")}
            name="appendices_categories"
          >
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Item ${field.name + 1}`}
                    key={field.key}
                    style={{ marginTop: "20px" }}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Row>
                      <Col span={10} style={{ display: "none" }}>
                        <Form.Item
                          {...layout}
                          label="id"
                          name={[field.name, "id"]}
                          //   wrapperCol={24}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...layout}
                          label="Name"
                          name={[field.name, "nameOfCategory"]}
                          //   wrapperCol={24}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...layout}
                          label="Required"
                          name={[field.name, "isRequired"]}
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...layout}
                          label="Number allowed"
                          name={[field.name, "numberOfAllowed"]}
                        >
                          <InputNumber min={0} step={1} />
                        </Form.Item>
                      </Col>
                    </Row>

                    {/* Nest Form.List */}
                    <Form.Item label="List">
                      <Form.List name={[field.name, "appendicesList"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  style={{ display: "none" }}
                                  name={[subField.name, "id"]}
                                >
                                  <InputNumber />
                                </Form.Item>

                                <Form.Item
                                  noStyle
                                  name={[subField.name, "nameOfAppendices"]}
                                >
                                  <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "price"]}
                                >
                                  <InputNumber
                                    placeholder="Price"
                                    min={0}
                                    step={0.01}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "doesAffectPrice"]}
                                  label="Does affect price ?"
                                  valuePropName="checked"
                                >
                                  <Checkbox />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              //   style={{ width: "100%" }}
                              //   block
                              //   wrapperCol={24}
                            >
                              + Add Sub Item
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}

                <Button
                  className="mt-3"
                  type="dashed"
                  onClick={() => add()}
                  block
                >
                  + Add Item
                </Button>
              </div>
            )}
          </Form.List>
          {/* 
  <Form.Item noStyle shouldUpdate>
    {() => (
      <Typography>
        <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
      </Typography>
    )}
  </Form.Item> */}
        </MainDivAppendices>
      )}
    </>
  );
};

export default AppendicesSection;
