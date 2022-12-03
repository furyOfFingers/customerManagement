import { Tabs } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";

import groupStore from "store/group";
import studentStore from "store/student";
import { IGroup } from "interfaces/group";

import Tab from "./Tab";
import s from "./VisitList.styl";

const { TabPane } = Tabs;

const VisitList = (): JSX.Element => {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    groupStore.getGroups();
    studentStore.getStudents();
  }, []);

  const handleClickDate = (arg: string) => {
    if (arg === "prev") {
      setDate(moment(date).subtract(1, "M"));
    } else {
      setDate(moment(date).add(1, "M"));
    }
  };

  const handleDayClick = (day: number) => {
    console.log("--> ", day, moment(date).format("MMMM - yyyy"));
  };

  const renderTabs = () =>
    groupStore.groups.data.map((group: IGroup) => {
      const studentsId = group.students;
      const students = studentStore.students.data.filter((el) =>
        studentsId.includes(el.id!)
      );

      return (
        <TabPane tab={group.group_name} key={group.id}>
          <Tab onClick={handleDayClick} date={date} students={students} />
        </TabPane>
      );
    });

  return (
    <div className={s.container}>
      <div className={s.date}>
        <LeftOutlined onClick={() => handleClickDate("prev")} />

        <div>{moment(date).format("MMMM - yyyy")}</div>

        <RightOutlined onClick={() => handleClickDate("next")} />
      </div>

      <Tabs>{renderTabs()}</Tabs>
    </div>
  );
};

export default observer(VisitList);
