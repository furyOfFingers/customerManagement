import { Tabs } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { isEmpty } from "ramda";

import groupStore from "store/group";
import visitListStore from "store/visitList";
import studentStore from "store/student";
import { IGroup } from "interfaces/group";
import {
  IColumnVisitList,
  TVisitList,
  TVisitListStudents,
  visitList,
} from "interfaces/visitList";
import Tab from "./Tab";
import s from "./VisitList.styl";

const getDate = (date: Moment | string | null, format: string) =>
  moment(date).format(format);

const { TabPane } = Tabs;

const VisitList = (): JSX.Element => {
  const { getVisitListData } = visitListStore;
  const [date, setDate] = useState(moment());
  const [groupId, setGroupId] = useState("1");
  const [initial, setInitial] = useState<TVisitList>(visitList);

  const year = getDate(date, "yyyy");
  const month = getDate(date, "MMMM");

  const request = {
    groupId,
    year,
    month,
  };

  useEffect(() => {
    groupStore.getGroups();
    studentStore.getStudents();
    visitListStore.getVisitList(request);
  }, []);

  useEffect(() => {
    if (!isEmpty(getVisitListData)) {
      setInitial(getVisitListData!);
    }
  }, [getVisitListData]);

  const handleCalendarChange = (day: Moment | null, tabId?: string) => {
    const data = {
      groupId: tabId ?? groupId,
      year: getDate(day, "yyyy"),
      month: getDate(day, "MMMM"),
    };
    visitListStore.getVisitList(data);

    setDate(day!);
  };

  const onSubmit = async (column: IColumnVisitList[], groupId: string) => {
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

    const setData = {
      [groupId]: {
        [year]: {
          [month]: student,
        },
      },
    };

    const getData = {
      groupId,
      year: getDate(date, "yyyy"),
      month: getDate(date, "MMMM"),
    };

    await visitListStore.setVisitList(setData);
    await visitListStore.getVisitList(getData);
  };

  // const handleChangeMonth = (key: string) => {
  //   const actualDate =
  //     key === "next"
  //       ? moment(date).add(1, "months")
  //       : moment(date).subtract(1, "months");

  //   handleCalendarChange(actualDate);
  // };

  const handleTabChange = (tabId: string) => {
    handleCalendarChange(date, tabId);
    setGroupId(tabId);
  };

  const renderTabs = () =>
    groupStore.groups.data.map((group: IGroup) => {
      const studentsId = group.students;
      const students = studentStore.students.data.filter((el) =>
        studentsId.includes(el.id!)
      );

      const filteredVisitList = initial?.[group.id!]?.[year]?.[month];

      return (
        !isEmpty(initial) && (
          <TabPane tab={`${group.id}-${group.group_name}`} key={group.id}>
            <Tab
              date={date}
              groupId={group.id}
              students={students}
              onSubmit={onSubmit}
              visitList={filteredVisitList!}
            />
          </TabPane>
        )
      );
    });

  const renderBody = () => {
    if (
      isEmpty(groupStore.groups.data) ||
      isEmpty(studentStore.students.data)
    ) {
      return <div>no data</div>;
    }

    return (
      <>
        <div className={s.date}>
          {/* <span onClick={() => handleChangeMonth("prev")}>left</span> */}

          <DatePicker
            onChange={(day) => handleCalendarChange(day)}
            allowClear={false}
            picker="month"
            placeholder="select date"
            defaultValue={moment()}
          />

          {/* <span onClick={() => handleChangeMonth("next")}>right</span> */}
        </div>

        <Tabs onChange={handleTabChange}>{renderTabs()}</Tabs>
      </>
    );
  };

  return <div className={s.container}>{renderBody()}</div>;
};

export default observer(VisitList);
