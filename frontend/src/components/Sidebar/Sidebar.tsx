import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { navigate, usePath } from "hookrouter";

import s from "./Sidebar.styl";

const { TabPane } = Tabs;

function Sidebar() {
  const path = usePath();
  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    setActiveTab(path);
  }, []);

  const handleChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className={s.container}>
      <Tabs activeKey={activeTab} tabPosition="left" onChange={handleChange}>
        <TabPane tab="Students" key="students" />
        <TabPane tab="Teachers" key="teachers" />
        <TabPane tab="Groups" key="groups" />
        <TabPane tab="Payments" key="payments" />
        <TabPane tab="Money report" key="moneyReport" />
      </Tabs>
    </div>
  );
}

export default Sidebar;
