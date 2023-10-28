import React, { FC, ReactElement, useState, useEffect } from "react";
import { MainAuthDiv } from "../../style/Layout";
import { ValidateStatus } from "../../app/service/Status";
import { register } from "../../app/service/auth";
import { App, Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { Link, Navigate, redirect } from "react-router-dom";
import { RootState } from "../../app/store";

interface RegisterProps {}

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  re_password?: string;
};

const Register: FC<RegisterProps> = ({}): ReactElement => {
  const dispatch = useAppDispatch();
  const [emailValidate, setEmailValidate] = useState<ValidateStatus>(
    ValidateStatus.SUCCESS
  );
  const [emailMessage, setEmailMessage] = useState("");
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const isAuthenticated = useAppSelector((state: RootState) => {
    return state.auth.jwt.isAuthenticated;
  });

  const onFinish = (values: any) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
        re_password: values.re_password,
      })
    )
      .unwrap()
      .then((res: string) => {
        if (res == "OK") {
          notification.success({
            message: "Successful registration",
            description: "Activation email is sent",
          });
          setEmailMessage("");
          setEmailValidate(ValidateStatus.SUCCESS);
          redirect("/login");
        }
      })
      .catch((error: { message: string; code: any }) => {
        notification.error({
          message: "Error",
          description: `${
            error.message
              ? error.message == "undefined"
                ? "Error"
                : error.message
              : "Error"
          }`,
        });

        if (Number(error.code) == 400) {
          setEmailMessage(`${error.message}`);
          setEmailValidate(ValidateStatus.ERROR);
        }
      });
  };

  const onFieldsChange = (changedValues: any, allValues: any) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setEmailValidate(ValidateStatus.ERROR);
    setEmailMessage("Email field can't be empty");
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setEmailValidate(ValidateStatus.ERROR);
      setEmailMessage("Email field can't be empty");
    } else {
      setEmailValidate(ValidateStatus.SUCCESS);
      setEmailMessage("");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} replace />
      ) : (
        <MainAuthDiv>
          <div className="main-wrapper">
            <div className="title">
              <h2>Sign up for food app</h2>
              <h6>
                Already have an account?
                <Button
                  style={{ marginLeft: "20px" }}
                  // onClick={() => setModal(1)}
                >
                  <Link to={"/login"}>Login</Link>
                </Button>
              </h6>
            </div>
            <div className="social">
              <div className="social-buttons">
                <Button className="social-button google">
                  Sign up with Google{" "}
                  <span className="icon">
                    <FcGoogle />
                  </span>
                </Button>
                <Button className="social-button facebook">
                  Sing up with Facebook{" "}
                  <span className="icon">
                    <GrFacebook />
                  </span>
                </Button>
              </div>
            </div>
            <div className="message">
              <h6>Or continue registration using your email address ...</h6>
            </div>
            <div className="form">
              <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item<FieldType>
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                  validateStatus={emailValidate}
                  help={emailMessage}
                >
                  <Input onChange={onChangeEmail} />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Password - 8 char"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password confirm"
                  name="re_password"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ offset: 0, span: 24 }}
                  className="submit-button-item-register"
                >
                  <Button type="primary" htmlType="submit">
                    Signup
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="terms">
              <h6>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                maxime, corrupti cum necessitatibus reiciendis pariatur
                similique?
              </h6>
            </div>
          </div>
        </MainAuthDiv>
      )}
    </>
  );
};

export default Register;
