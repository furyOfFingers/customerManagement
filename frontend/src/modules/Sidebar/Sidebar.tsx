import React from "react";
import { Menu } from "antd";
import {
  DollarCircleOutlined,
  QqOutlined,
  GithubOutlined,
  TeamOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

import s from "./Sidebar.styl";

const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5"];

function Sidebar() {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div className={s.container}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
      >
        <SubMenu key="sub1" icon={<TeamOutlined />} title="Groups">
          <Menu.Item key="1">View</Menu.Item>
          <Menu.Item key="2">Added</Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<DollarCircleOutlined />} title="Payments">
          <Menu.Item key="3">View</Menu.Item>
          <Menu.Item key="4">Added</Menu.Item>
          {/* <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}
        </SubMenu>

        <SubMenu key="sub3" icon={<QqOutlined />} title="Students">
          <Menu.Item key="5">View</Menu.Item>
          <Menu.Item key="6">Added</Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" icon={<GithubOutlined />} title="Teachers">
          <Menu.Item key="7">View</Menu.Item>
          <Menu.Item key="8">Added</Menu.Item>
        </SubMenu>

        <SubMenu key="sub5" icon={<LineChartOutlined />} title="Money report">
          <Menu.Item key="9">View</Menu.Item>
          <Menu.Item key="10">Added</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Sidebar;
