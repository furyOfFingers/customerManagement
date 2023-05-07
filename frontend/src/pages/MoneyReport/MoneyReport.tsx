import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";

import CommonMode from "./CommonMode";
import paymentStore from "store/payment";
import studentStore from "store/student";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import DetailMode from "./DetailMode";
import s from "./MoneyReport.styl";

const MoneyReport = (): JSX.Element => {
  const [isCommonMode, setIsCommonMode] = useState(false);

  useEffect(() => {
    teacherStore.getTeachers();
    groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments();
  }, []);

  const handleChangeReportMode = () => {
    setIsCommonMode(!isCommonMode);
  };

  return (
    <div className={s.container}>
      <Button
        type="link"
        className={s.settings}
        onClick={handleChangeReportMode}
      >
        {isCommonMode ? "detail mode" : "common mode"}
      </Button>

      {isCommonMode ? (
        <CommonMode
          students={studentStore.students.data}
          teachers={teacherStore.teachers.data}
          payments={paymentStore.payments.data}
          groups={groupStore.groups.data}
        />
      ) : (
        <DetailMode
          students={studentStore.students.data}
          teachers={teacherStore.teachers.data}
          payments={paymentStore.payments.data}
          groups={groupStore.groups.data}
        />
      )}
    </div>
  );
};

export default observer(MoneyReport);
