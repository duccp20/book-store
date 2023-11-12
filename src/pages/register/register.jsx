import React, { useState } from "react";
import "./styles.css";
import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { callRegister } from "../../service/api";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setSubmit(true);
    const res = await callRegister(fullName, email, password, phone);
    setSubmit(false);
    if (res?.data?._id) {
      message.success("Bạn đã đăng ký thành công!");
      navigate("/login");
    } else {
      notification.error({
        message: `Đã có lỗi`,
        description:
          res?.message && Array.isArray(res.message) ? res.message[0] : res,
        duration: 5,
      });
    }
  };
  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col className="form__wrapper" span={8}>
          <Row justify="center" style={{ fontSize: 25, fontWeight: 500 }}>
            <h1>Đăng ký</h1>
          </Row>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Họ và tên:"
              name="fullName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email:"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item justify="middle">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-submit"
                loading={isSubmit}
                justify="center"
                align="middle"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <Form.Item>
              <Row justify="center">
                <span>Or</span>
              </Row>
              <Row justify="center">
                <span>
                  Đã có tài khoản?
                  <a href="/login">Đăng nhập</a>
                </span>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default RegisterPage;
