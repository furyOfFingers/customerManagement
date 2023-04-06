import { Tabs } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { isEmpty } from "ramda";

import groupStore from "store/group";
import studentStore from "store/student";
import { IGroup } from "interfaces/group";
import {
  IColumnVisitList,
  TVisitListStudents,
  visitList,
} from "interfaces/visitList";
import Tab from "./Tab";
import s from "./VisitList.styl";

const { TabPane } = Tabs;

const VisitList = (): JSX.Element => {
  const [date, setDate] = useState(moment());
  const [initial, setInitial] = useState(visitList);
  const year = moment(date).format("yyyy");
  const month = moment(date).format("MMMM");

  useEffect(() => {
    groupStore.getGroups();
    studentStore.getStudents();
  }, []);

  const handleCalendarChange = (day: Moment | null) => {
    if (day) {
      return setDate(day);
    }
    setDate(moment());
  };

  const onSubmit = (column: IColumnVisitList[], groupId: string) => {
    const student: TVisitListStudents = {};

    Object.keys(column).forEach((el) => {
      const days = {};

      column[el].days.forEach((day: string, i: number) => {
        if (day) {
          days[i + 1] = day;
        }
      });
      if (!isEmpty(days)) {
        student[column[el].key] = days;
      }
    });

    const data = {
      [groupId]: {
        [year]: {
          [month]: student,
        },
      },
    };

    setInitial(data);
  };

  const renderTabs = () =>
    groupStore.groups.data.map((group: IGroup) => {
      const studentsId = group.students;
      const students = studentStore.students.data.filter((el) =>
        studentsId.includes(el.id!)
      );

      const filteredVisitList = initial[group.id!]?.[year]?.[month];

      return (
        <TabPane tab={`${group.id}-${group.group_name}`} key={group.id}>
          <Tab
            date={date}
            groupId={group.id}
            students={students}
            onSubmit={onSubmit}
            visitList={filteredVisitList}
          />
        </TabPane>
      );
    });

  return (
    <div className={s.container}>
      <div className={s.date}>
        <DatePicker
          onChange={handleCalendarChange}
          allowClear
          picker="month"
          placeholder="select date"
        />
      </div>

      <Tabs>{renderTabs()}</Tabs>
    </div>
  );
};

export default observer(VisitList);
