import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin, Avatar, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cls from "classnames";

import userStore from "store/user";
import spinStore from "store/spin";
import authStore from "store/auth";
import s from "./Header.styl";

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
      <Menu.Item key="1" onClick={() => authStore.logout()}>
        logout
      </Menu.Item>
    </Menu>
  );

  const renderBody = () => (
    <div className={cls(s.container, { [s.containerShadow]: isFolded })}>
      {spinStore.get() && <Spin size="large" className={s.spin} />}

      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button>menu</Button>
      </Dropdown>

      <Avatar className={s.avatar} shape="square" icon={<UserOutlined />} />

      <div className={s.username}>{userStore.get().username}</div>
    </div>
  );

  return renderBody();
}

export default observer(Header);
