import React from "react";
import { observer } from "mobx-react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { IAuthSignIn } from "interfaces/auth";
import { schemeSignIn } from "schemes/auth";
import { SIGNIN, SIGNUP } from "constants/auth";
import s from "./SignIn.styl";

interface ISignIn {
  onFormChange: (str: string) => void;
  onFinish: (formName: string, data: IAuthSignIn) => void;
  disabled: boolean;
}

const SignIn = ({ onFormChange, onFinish, disabled }: ISignIn): JSX.Element => {
  const onSubmit = (data: IAuthSignIn) => {
    onFinish(SIGNIN, data);
  };

  return (
    <div className={s.container}>
      <Form
        validateMessages={schemeSignIn}
        initialValues={{
          remember: true,
          username: "MaratAsadullaev",
          password: "MaratAsadullaev",
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
            disabled={disabled}
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
            disabled={disabled}
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
              disabled={disabled}
            >
              Sign in
            </Button>

            <Button
              disabled={disabled}
              onClick={() => onFormChange(SIGNUP)}
              type="link"
            >
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(SignIn);
