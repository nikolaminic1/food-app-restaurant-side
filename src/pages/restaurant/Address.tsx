import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { App, Form, Input, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { SubmitButton } from "./ProductPage";
import { useAppDispatch } from "../../app/hooks";
import { getAddress, updateAddress } from "../../app/service/auth";
import { Address as AddressType } from "../../app/models/auth";
import { Navigate, redirect, useNavigate } from "react-router-dom";

interface Props {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const Address: FC<Props> = ({}): ReactElement => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const run = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log(values);
    dispatch(updateAddress(values))
      .unwrap()
      .then((res) => {
        console.log(res);
        notification.success({ message: "Address is successfully updated" });
        return navigate("/");
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "An error occurred while updating the address",
          description: `${error.message}`,
        });
      });
  };

  useEffect(() => {
    if (run.current === false) {
      dispatch(getAddress())
        .unwrap()
        .then((res: AddressType) => {
          console.log(res);
          form.setFieldsValue({
            streetName: res.streetName,
            buildingNumber: res.buildingNumber,
            flatNumber: res.flatNumber,
            zipCode: res.zipCode,
            cityName: res.cityName,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      run.current = true;
    };
  }, []);

  return (
    <div>
      <h3>Address</h3>
      <div className="address-form">
        <Form
          layout="vertical"
          name="address"
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            rules={[{ required: true }]}
            name={"streetName"}
            label="Street name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={"buildingNumber"}
            label="Building number"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={"flatNumber"}
            label="Flat number"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={"zipCode"}
            label="Zip code"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={"cityName"}
            label="City name"
          >
            <Input />
          </Form.Item>

          <Form.Item className="save-button mt-4" wrapperCol={{ span: 24 }}>
            <Popconfirm
              title="Address save"
              description="Are you sure you want to save changes ?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => form.submit()}
            >
              <SubmitButton form={form} />{" "}
            </Popconfirm>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Address;
