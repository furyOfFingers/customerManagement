import React from "react";
import { Tabs } from "antd";
import { navigate } from "hookrouter";

import s from "./Sidebar.styl";

const { TabPane } = Tabs;

function Sidebar() {
  const handleChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className={s.container}>
      <Tabs tabPosition="left" onChange={handleChange}>
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
