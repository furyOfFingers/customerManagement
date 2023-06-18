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
import { navigate, usePath } from "hookrouter";

import s from "./Sidebar.styl";

const { TabPane } = Tabs;

const tabs = [
  {
    tab: (
      <>
        <AndroidOutlined />
        <span className={s.tabText}>Students</span>
      </>
    ),
    key: "students",
  },
  {
    tab: (
      <>
        <UserOutlined />
        <span className={s.tabText}>Teachers</span>
      </>
    ),
    key: "teachers",
  },
  {
    tab: (
      <>
        <ScheduleOutlined />
        <span className={s.tabText}>Schedule List</span>
      </>
    ),
    key: "scheduleList",
  },
  {
    tab: (
      <>
        <SolutionOutlined />
        <span className={s.tabText}>Visit List</span>
      </>
    ),
    key: "visitList",
  },
  {
    tab: (
      <>
        <TeamOutlined />
        <span className={s.tabText}>Groups</span>
      </>
    ),
    key: "groups",
  },
  {
    tab: (
      <>
        <PoundCircleOutlined />
        <span className={s.tabText}>Payments</span>
      </>
    ),
    key: "payments",
  },
  {
    tab: (
      <>
        <FundProjectionScreenOutlined />
        <span className={s.tabText}>Money report</span>
      </>
    ),
    key: "moneyReport",
  },
  {
    tab: (
      <>
        <FileUnknownOutlined />
        <span className={s.tabText}>Help</span>
      </>
    ),
    key: "help",
  },
];

function Sidebar() {
  const path = usePath();
  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    setActiveTab(path.replace("/", ""));
  }, []);

  const handleChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  const renderTabs = () =>
    tabs.map(({ tab, key }) => <TabPane tab={tab} key={key} />);

  return (
    <div className={s.container}>
      <Tabs activeKey={activeTab} tabPosition="left" onChange={handleChange}>
        {renderTabs()}
      </Tabs>
    </div>
  );
}

export default Sidebar;
