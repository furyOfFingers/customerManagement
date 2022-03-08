import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { IAuthSignIn } from "interfaces/auth";
import { schemeSignIn } from "schemes/auth";

import s from "./SignIn.styl";

interface ISignIn {
  onFormChange: (str: string) => void;
}

// const schemeSignIn = {
//   required: "${label} is required!",
//   username: {
//     range: "${label} must be between ${min} and ${max}",
//   },
//   password: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };

const SignIn = ({ onFormChange }: ISignIn): JSX.Element => {
  const onFinish = (values: IAuthSignIn) => {
    console.log("sign in: ", values);
  };
  // const buttonItemLayout = {
  //   wrapperCol: { offset: 6 },
  // };
  return (
    <div className={s.container}>
      <Form
        validateMessages={schemeSignIn}
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
              Sign in
            </Button>

            <Button onClick={() => onFormChange("signUp")} type="link">
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
