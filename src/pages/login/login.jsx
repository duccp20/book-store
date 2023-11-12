import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./loginStyle.css";
import { callLogin } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
const LoginPage = () => {
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { username, password } = values;
    setSubmit(true);
    const res = await callLogin(username, password);
    setSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập thành coong");
      window.location.href = "/";
    } else {
      notification.error({
        message: `Đăng nhập thất bại`,
        description: res?.message ?? res,
      });
    }
  };

  return (
    <>
      <Col>
        <Row justify={"center"} align="middle" style={{ height: "100vh" }}>
          <Col className="wrapper">
            <Row justify={"center"}>
              <Form.Item>
                <h1 style={{ fontSize: 32, fontWeight: 500 }}>Đăng Nhập</h1>
              </Form.Item>
            </Row>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isSubmit}
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default LoginPage;
