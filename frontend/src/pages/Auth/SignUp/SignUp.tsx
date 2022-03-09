import React from "react";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { schemeSignUp } from "schemes/auth";
import { IAuthSignUp } from "interfaces/auth";
import s from "./SignUp.styl";

interface ISignUp {
  onFormChange: (str: string) => void;
  onFinish: (formName: string, data: IAuthSignUp) => void;
}

const SignUp = ({ onFormChange, onFinish }: ISignUp): JSX.Element => {
  const onSubmit = (data: IAuthSignUp) => {
    onFinish("signup", data);
  };

  return (
    <div className={s.container}>
      <Form
        validateMessages={schemeSignUp}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              min: 8,
              max: 30,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>

        <Form.Item name="gender" initialValue="male">
          <Radio.Group buttonStyle="outline">
            <Radio.Button value="male">male</Radio.Button>
            <Radio.Button value="female">female</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              min: 8,
              max: 80,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>

        <Form.Item>
          <div className={s.buttons}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>

            <Button onClick={() => onFormChange("signIn")} type="link">
              Sign In
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
