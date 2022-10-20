import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { Table, Select } from "antd";

import paymentStore from "store/payment";
import studentStore from "store/student";
import teacherStore from "store/teacher";
import { ITeacher } from "interfaces/teacher";
import s from "./MoneyReport.styl";

const { Option } = Select;

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "student",
    dataIndex: "student",
    key: "student",
  },
  {
    title: "payment date",
    dataIndex: "paymentDate",
    key: "paymentDate",
  },
  {
    title: "method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "payment amount",
    dataIndex: "paymentAmount",
    key: "paymentAmount",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
];

const MoneyReport = (): JSX.Element => {
  const [teacherId, setTeacherId] = useState("");
  const [method, setMethod] = useState("");

  useEffect(() => {
    teacherStore.getTeachers();
    // groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments();
  }, []);

  const renderTeacherOptions = () =>
    teacherStore.teachers.data.map((teacher: ITeacher) => (
      <Option key={teacher.id} value={teacher.id}>
        {teacher.id}
        {"-"}
        {teacher.lastname}. {teacher.firstname[0]}. {teacher.patronymic[0]}
      </Option>
    ));

  const renderMethodOptions = () =>
    ["cash", "card"].map((el: string) => (
      <Option key={el} value={el}>
        {el}
      </Option>
    ));

  const payerInfo = (id: string) => {
    const { lastname, firstname, patronymic } = studentStore.findStudent(id)!;

    return `${lastname} ${firstname[0].toUpperCase()}. ${patronymic[0].toUpperCase()}.`;
  };

  const returnData = () => {
    const filteredTeacher = paymentStore.payments.data.filter(
      (el) => el.teacher_id === teacherId
    );

    const source = teacherId ? filteredTeacher : paymentStore.payments.data;

    return source.map((el) => ({
      key: el.id,
      id: el.id,
      student: payerInfo(el.payer_id),
      paymentDate: moment(el.payment_date).format("DD-MM-YYYY"),
      method: el.method,
      paymentAmount: el.payment_amount,
      type: el.type,
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <Select
          allowClear
          onSelect={(value: string) => setTeacherId(value)}
          onClear={() => setTeacherId("")}
          placeholder="select teacter"
        >
          {renderTeacherOptions()}
        </Select>

        <Select
          allowClear
          onSelect={(value: string) => setMethod(value)}
          onClear={() => setMethod("")}
          placeholder="select method"
        >
          {renderMethodOptions()}
        </Select>
      </div>

      <Table columns={columns} dataSource={returnData()} pagination={false} />
    </div>
  );
};

export default observer(MoneyReport);
