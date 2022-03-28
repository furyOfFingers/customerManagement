import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Spin } from "antd";
import users from "store/users";

import s from "./Header.styl";
import spin from "store/spin";

function Header() {
  return (
    <div className={s.container}>
      {spin.spin && <Spin size="large" className={s.spin} />}
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        onClick={users.getUsers}
      >
        users
      </Button>
    </div>
  );
}

export default observer(Header);
