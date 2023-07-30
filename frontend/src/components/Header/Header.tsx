import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin, Avatar, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cls from "classnames";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";

import userStore from "store/user";
import spinStore from "store/spin";
// import authStore from "store/auth";
import s from "./Header.styl";

function Header(): JSX.Element {
  const [isFolded, setIsFolded] = useState(false);
  const { t, i18n } = useTranslation();

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: t("menu.logout"),
    },
    {
      key: "2",
      label: t("menu.changeLanguage"),
    },
  ];

  const setLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "2") {
      i18n.language === "en" ? setLanguage("ru") : setLanguage("en");
    }
  };

  const renderBody = () => (
    <div className={cls(s.container, { [s.containerShadow]: isFolded })}>
      {spinStore.get() && <Spin size="large" className={s.spin} />}

      <Dropdown
        menu={{ items, onClick }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Button>menu</Button>
        </a>
      </Dropdown>

      <Avatar className={s.avatar} shape="square" icon={<UserOutlined />} />

      <div className={s.username}>{userStore.get().username}</div>
    </div>
  );

  return renderBody();
}

export default observer(Header);
