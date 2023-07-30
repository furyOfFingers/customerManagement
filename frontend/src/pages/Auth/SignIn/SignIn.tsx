import React from "react";
import { observer } from "mobx-react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { IAuthSignIn } from "interfaces/auth";
import { schemeSignIn } from "schemes/auth";
import { SIGNIN, SIGNUP } from "constants/auth";
import error from "store/errorHandle";
import s from "./SignIn.styl";

interface ISignIn {
  onFormChange: (str: string) => void;
  onFinish: (formName: string, data: IAuthSignIn) => void;
  disabled: boolean;
}

const SignIn = ({ onFormChange, onFinish, disabled }: ISignIn): JSX.Element => {
  const onSubmit = (data: IAuthSignIn) => {
    error.removeError("", "", true);
    onFinish(SIGNIN, data);
  };

  const err = error.error;

  return (
    <div className={s.container}>
      <Form
        onValuesChange={() => error.removeError("signin", "email")}
        validateMessages={schemeSignIn}
        // initialValues={{
        //   remember: true,
        //   email: "wills900@mail.ru",
        //   password: "MaratAsadullaev",
        // }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          validateStatus={err?.signin?.email ? "error" : undefined}
          help={err?.signin?.email}
          rules={[
            {
              required: true,
              min: 5,
              max: 120,
            },
          ]}
        >
          <Input
            disabled={disabled}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={err?.signin?.email ? "error" : undefined}
          rules={[
            {
              required: true,
              min: 8,
              max: 120,
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
            <Button type="primary" htmlType="submit" disabled={disabled}>
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
