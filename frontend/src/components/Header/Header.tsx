import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin, Avatar, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cls from "classnames";

import user from "store/user";
import s from "./Header.styl";
import spin from "store/spin";
import auth from "store/auth";

function Header(): JSX.Element {
  const [isFolded, setIsFolded] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 2) {
      setIsFolded(true);
    } else {
      setIsFolded(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  });

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => auth.logout()}>
        logout
      </Menu.Item>
    </Menu>
  );

  const renderBody = () => {
    return (
      <div className={cls(s.container, { [s.containerShadow]: isFolded })}>
        {spin.spin && <Spin size="large" className={s.spin} />}
        {/* <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={users.getUsers}
        >
          users
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() =>
            console.log("--> errorHandle.error", toJS(errorHandle.error.signup))
          }
        >
          show Error
        </Button> */}
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button>menu</Button>
        </Dropdown>

        <Avatar className={s.avatar} shape="square" icon={<UserOutlined />} />

        <div className={s.username}>{user?.user?.username}</div>
      </div>
    );
  };

  return renderBody();
}

export default observer(Header);
