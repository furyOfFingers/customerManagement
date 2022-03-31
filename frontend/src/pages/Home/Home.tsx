import React from "react";
import { observer } from "mobx-react";
// import { toJS } from "mobx";
// import { Form, Input, Button, Radio } from "antd";
// import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

// import { schemeSignUp } from "schemes/auth";
// import { IAuthSignUp } from "interfaces/auth";
// import { SIGNIN, SIGNUP } from "constants/auth";
// import errorHandle from "store/errorHandle";
import s from "./Home.styl";

// interface IHome {
//   // onFormChange: (str: string) => void;
//   // onFinish: (formName: string, data: IAuthSignUp) => void;
//   // disabled: boolean;
// }

const Home = (): // {}: IHome
JSX.Element => {
  return <div className={s.container}>home</div>;
};

export default observer(Home);
