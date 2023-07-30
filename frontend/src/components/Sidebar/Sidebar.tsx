import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import {
  UserOutlined,
  AndroidOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  FileUnknownOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  PoundCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import s from "./Sidebar.styl";

const tabs: { Icon: unknown; key: string }[] = [
  {
    Icon: AndroidOutlined,
    key: "students",
  },
  {
    Icon: UserOutlined,
    key: "teachers",
  },
  {
    Icon: ScheduleOutlined,
    key: "scheduleList",
  },
  {
    Icon: SolutionOutlined,
    key: "visitList",
  },
  {
    Icon: TeamOutlined,
    key: "groups",
  },
  {
    Icon: PoundCircleOutlined,
    key: "payments",
  },
  {
    Icon: FundProjectionScreenOutlined,
    key: "moneyReport",
  },
  {
    Icon: FileUnknownOutlined,
    key: "help",
  },
];

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    setActiveTab(pathname.replace("/", ""));
  }, []);

  const handleChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className={s.container}>
      <Tabs
        activeKey={activeTab}
        tabPosition="left"
        onChange={handleChange}
        items={tabs.map(({ Icon, key }) => {
          return {
            label: (
              <div>
                <Icon />
                <span>{t(`sidebar.${key}`)}</span>
              </div>
            ),
            key,
            // children: <span className={s.tabText}>{key}</span>,
          };
        })}
      />
    </div>
  );
}

export default Sidebar;
