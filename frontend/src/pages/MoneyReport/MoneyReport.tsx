import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Moment } from "moment";
import { Table, Select, DatePicker } from "antd";

import paymentStore from "store/payment";
import studentStore from "store/student";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import { ITeacher } from "interfaces/teacher";
import { IPayment } from "interfaces/payment";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import { OPTIONS_TYPE } from "pages/Payments/PaymentsForm/constants";
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
    title: "teacher",
    dataIndex: "teacher",
    key: "teacher",
  },
  {
    title: "group",
    dataIndex: "group",
    key: "group",
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
  const [studentId, setStudentId] = useState("");
  const [method, setMethod] = useState("");
  const [groupId, setGroupId] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    teacherStore.getTeachers();
    groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments();
  }, []);

  const handleCalendarChange = (_: Moment | null, dateString: string) => {
    setDate(dateString);
  };

  const renderStudentOptions = () =>
    studentStore.students.data.map((student: IStudent) => (
      <Option key={student.id} value={student.id}>
        {student.id}
        {"-"}
        {student.lastname}. {student.firstname[0]}. {student.patronymic[0]}
      </Option>
    ));

  const renderTeacherOptions = () =>
    teacherStore.teachers.data.map((teacher: ITeacher) => (
      <Option key={teacher.id} value={teacher.id}>
        {teacher.id}
        {"-"}
        {teacher.lastname}. {teacher.firstname[0]}. {teacher.patronymic[0]}
      </Option>
    ));

  const renderGroupOptions = () =>
    groupStore.groups.data.map((group: IGroup) => (
      <Option key={group.id} value={group.id}>
        {group.group_name}
      </Option>
    ));

  const renderMethodOptions = () =>
    ["cash", "card"].map((el: string) => (
      <Option key={el} value={el}>
        {el}
      </Option>
    ));

  const renderTypeOptions = () =>
    OPTIONS_TYPE.map((el: string) => (
      <Option key={el} value={el}>
        {el}
      </Option>
    ));

  const studentInfo = (id: string) => {
    const { lastname, firstname, patronymic } = studentStore.findStudent(id)!;

    return `${lastname} ${firstname[0].toUpperCase()}. ${patronymic[0].toUpperCase()}.`;
  };

  const teacherInfo = (id: string) => {
    const { lastname, firstname, patronymic } = teacherStore.findTeacher(id)!;

    return `${lastname} ${firstname[0].toUpperCase()}. ${patronymic[0].toUpperCase()}.`;
  };

  const groupInfo = (id: string) => groupStore.findGroup(id)!.group_name;

  const returnData = () => {
    const { data } = paymentStore.payments;
    let filtered = [...data];

    if (studentId) {
      filtered = filtered.filter((el: IPayment) => el.payer_id === studentId);
    }

    if (teacherId) {
      filtered = filtered.filter((el: IPayment) => el.teacher_id === teacherId);
    }

    if (method) {
      filtered = filtered.filter((el: IPayment) => el.method === method);
    }

    if (groupId) {
      filtered = filtered.filter((el: IPayment) => el.group_id === groupId);
    }

    if (type) {
      filtered = filtered.filter((el: IPayment) => el.type === type);
    }

    if (date) {
      filtered = filtered.filter((el: IPayment) => el.payment_date === date);
    }

    return filtered.map((el) => ({
      key: el.id,
      id: el.id,
      student: studentInfo(el.payer_id),
      teacher: teacherInfo(el.teacher_id!),
      group: groupInfo(el.group_id!),
      paymentDate: el.payment_date,
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
          onSelect={(value: string) => setStudentId(value)}
          onClear={() => setStudentId("")}
          placeholder="select student"
        >
          {renderStudentOptions()}
        </Select>

        <Select
          allowClear
          onSelect={(value: string) => setTeacherId(value)}
          onClear={() => setTeacherId("")}
          placeholder="select teacher"
        >
          {renderTeacherOptions()}
        </Select>

        <Select
          allowClear
          onSelect={(value: string) => setGroupId(value)}
          onClear={() => setGroupId("")}
          placeholder="select group"
        >
          {renderGroupOptions()}
        </Select>

        <DatePicker
          onChange={handleCalendarChange}
          allowClear
          placeholder="payment date"
          format={"DD.MM.YYYY"}
        />

        <Select
          allowClear
          onSelect={(value: string) => setMethod(value)}
          onClear={() => setMethod("")}
          placeholder="select method"
        >
          {renderMethodOptions()}
        </Select>

        <Select
          allowClear
          onSelect={(value: string) => setType(value)}
          onClear={() => setType("")}
          placeholder="select type"
        >
          {renderTypeOptions()}
        </Select>
      </div>

      <Table columns={columns} dataSource={returnData()} pagination={false} />
    </div>
  );
};

export default observer(MoneyReport);
