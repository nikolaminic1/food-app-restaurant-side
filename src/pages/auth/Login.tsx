import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { App, Button, Checkbox, Form, Input } from "antd";
import { Link, Navigate, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ValidateStatus } from "../../app/service/Status";
import { logout } from "../../app/store/actions/auth";
import { getMyProfile, login } from "../../app/service/auth";
import { MainAuthDiv, MainLoginModalDiv } from "../../style/Layout";
import { RootState } from "../../app/store";

interface LoginProps {}

type FieldType = {
  email?: string;
  password?: string;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

const Login: FC<LoginProps> = ({}): ReactElement => {
  const dispatch = useAppDispatch();
  const [emailValidate, setEmailValidate] = useState<ValidateStatus>(
    ValidateStatus.SUCCESS
  );
  const [passwordValidate, setPasswordValidate] = useState<ValidateStatus>(
    ValidateStatus.SUCCESS
  );

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const { notification } = App.useApp();
  const isAuthenticated = useAppSelector((state: RootState) => {
    return state.auth.jwt.isAuthenticated;
  });

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      logout();
    }
  }, []);

  const onFinish = (values: any) => {
    dispatch(login({ email: values.email, password: values.password }))
      .unwrap()
      .then((res) => {
        if (res.access) {
          notification.success({
            message: "Successful login",
            description: "You can continue exploring available restaurants !",
          });
          dispatch(getMyProfile())
            .unwrap()
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
          return redirect("/");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message == "Bad credentials") {
          setEmailValidate(ValidateStatus.SUCCESS);
          setEmailMessage("");
          setPasswordValidate(ValidateStatus.ERROR);
          setPasswordMessage(`${error.message}`);
        } else if (Number(error.status) == 400) {
          setEmailValidate(ValidateStatus.ERROR);
          setEmailMessage(`${error.message} !`);
        } else {
          notification.error({
            message: "Error",
          });
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {};

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setEmailValidate(ValidateStatus.ERROR);
      setEmailMessage("Email field can't be empty");
    } else {
      setEmailValidate(ValidateStatus.SUCCESS);
      setEmailMessage("");
    }
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setPasswordValidate(ValidateStatus.ERROR);
      setPasswordMessage("Password field can't be empty");
    } else {
      setPasswordValidate(ValidateStatus.SUCCESS);
      setPasswordMessage("");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navigate to={"/"} replace />
        </>
      ) : (
        <MainAuthDiv>
          <div className="main-wrapper">
            <div className="title">
              <h2>Login to food app</h2>
              <h6>
                First time using out app?
                <Button style={{ marginLeft: "20px" }}>
                  <Link to={"/register"}>Register</Link>
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
              <h6>Or continue to sign in using your email address ...</h6>
            </div>
            <div className="form">
              <Form
                name="basic"
                // layout="vertical"
                labelAlign="left"
                {...formItemLayout}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                  validateStatus={emailValidate}
                  help={emailMessage}
                >
                  <Input onChange={onChangeEmail} />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  validateStatus={passwordValidate}
                  help={passwordMessage}
                >
                  <Input.Password onChange={onChangePassword} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ offset: 0, span: 24 }}
                  className="submit-button-item-register"
                >
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </MainAuthDiv>
      )}
    </>
  );
};

export default Login;
