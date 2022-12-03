import React from "react";
import { Tabs, Typography } from "antd";

import s from "./Help.styl";

const { Title } = Typography;

const Help = (): JSX.Element => {
  return (
    <div className={s.container}>
      <Tabs>
        <Tabs.TabPane tab="make multiple entries" key="1">
          <Title level={4}>1. create text file with txt extension</Title>

          <Title level={4}>
            2. enter the data in the following order, observing the spaces
          </Title>

          <Title level={5}>
            Киреев Анзор Вагабович 89065523467 28.02.1990 male
            <br />
            Кучеров Сапсан Рждэевич 89067533467 28.02.1980 male
            <br />
            Парацетомолова Светлана Мумиевовна 89067533462 28.03.1980 female
            <br />
            Кунжутова Лариса Мумиевовна 89067537462 01.03.1980 female
            <br />
          </Title>
        </Tabs.TabPane>

        {/* <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>

        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane> */}
      </Tabs>
    </div>
  );
};

export default Help;
