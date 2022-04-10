import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { schemeSignUp } from "schemes/auth";
import { IAuthSignUp } from "interfaces/auth";
import { SIGNIN, SIGNUP } from "constants/auth";
import error from "store/errorHandle";
import s from "./SignUp.styl";

interface ISignUp {
  onFormChange: (str: string) => void;
  onFinish: (formName: string, data: IAuthSignUp) => void;
  disabled: boolean;
}

const SignUp = ({ onFormChange, onFinish, disabled }: ISignUp): JSX.Element => {
  const onSubmit = (data: IAuthSignUp) => {
    error.removeError("", "", true);
    onFinish(SIGNUP, data);
  };
  const err = toJS(error.error);

  return (
    <div className={s.container}>
      <Form
        validateMessages={schemeSignUp}
        onFinish={onSubmit}
        initialValues={{
          remember: true,
          username: "MaratAsadullaev",
          password: "MaratAsadullaev",
          email: "wills900@mail.ru",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              min: 5,
              max: 50,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="username"
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          name="email"
          validateStatus={err?.signup?.email ? "error" : undefined}
          help={err?.signup?.email}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            onChange={() => error.removeError("signup", "email")}
            disabled={disabled}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>

        <Form.Item name="gender" initialValue="male">
          <Radio.Group buttonStyle="outline" disabled={disabled}>
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
              max: 120,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item>
          <div className={s.buttons}>
            <Button type="primary" htmlType="submit" disabled={disabled}>
              Sign Up
            </Button>

            <Button
              type="link"
              disabled={disabled}
              onClick={() => onFormChange(SIGNIN)}
            >
              Sign In
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(SignUp);
