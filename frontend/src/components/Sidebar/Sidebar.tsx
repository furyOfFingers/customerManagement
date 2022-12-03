import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { navigate, usePath } from "hookrouter";

import s from "./Sidebar.styl";

const { TabPane } = Tabs;

const tabs = [
  { tab: "Students", key: "students" },
  { tab: "Teachers", key: "teachers" },
  { tab: "Schedule List", key: "scheduleList" },
  { tab: "Visit List", key: "visitList" },
  { tab: "Groups", key: "groups" },
  { tab: "Payments", key: "payments" },
  { tab: "Money report", key: "moneyReport" },
  { tab: "Help", key: "help" },
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
