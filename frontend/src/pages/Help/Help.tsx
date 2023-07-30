import React from "react";
import { Tabs, Typography } from "antd";
import type { TabsProps } from "antd";

import { useTranslation } from "react-i18next";

import s from "./Help.styl";

const { Title } = Typography;

const Help = (): JSX.Element => {
  const { t } = useTranslation();
  const make = (
    <>
      <Title level={4}>{t("help.makeMultiple.firstStep")}</Title>

      <Title level={4}>{t("help.makeMultiple.secondStep")}</Title>

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
    </>
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("help.makeMultiple.title"),
      children: make,
    },
  ];
  return (
    <div className={s.container}>
      <Tabs items={items} />
    </div>
  );
};

export default Help;
