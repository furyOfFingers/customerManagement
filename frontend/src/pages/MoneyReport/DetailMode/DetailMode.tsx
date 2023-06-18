import React, { useState } from "react";
import { Moment } from "moment";
import { Table, Select, DatePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import { isEmpty } from "ramda";

import { ITeacher } from "interfaces/teacher";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import { IPayment } from "interfaces/payment";
import { IMoneyReportSettings } from "interfaces/moneyReport";
import { columns } from "./constants";
import { startDate, endDate } from "utils/date";
import s from "./DetailMode.styl";

const { RangePicker } = DatePicker;
const { Option } = Select;

const renderMethodOptions = () =>
  ["cash", "card"].map((el: string) => (
    <Option key={el} value={el}>
      {el}
    </Option>
  ));

interface IownProps {
  optionsType: IMoneyReportSettings[] | null;
  students: IStudent[];
  teachers: ITeacher[];
  payments: IPayment[];
  groups: IGroup[];
  date: [string, string];
  onDateChange: (date: [string, string]) => void;
}

const DetailMode = ({
  students,
  teachers,
  payments,
  groups,
  optionsType,
  date,
  onDateChange,
}: IownProps): JSX.Element => {
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [method, setMethod] = useState("");
  const [groupId, setGroupId] = useState("");
  const [type, setType] = useState("");

  const renderOptionsType = () => {
    if (isEmpty(optionsType)) {
      return [];
    }

    return optionsType?.map((el: IMoneyReportSettings) => (
      <Option key={el.id} value={el.value}>
        {el.value}
      </Option>
    ));
  };

  const studentInfo = (id: string) => {
    const found = students.find((item) => item.id === id)!;

    return `${
      found.lastname
    } ${found.firstname[0].toUpperCase()}. ${found.patronymic[0].toUpperCase()}.`;
  };

  const teacherInfo = (id: string) => {
    const found = teachers.find((item) => item.id === id)!;

    return `${
      found.lastname
    } ${found.firstname[0].toUpperCase()}. ${found.patronymic[0].toUpperCase()}.`;
  };

  const renderStudentOptions = () =>
    students.map((student: IStudent) => (
      <Option key={student.id} value={student.id}>
        {student.id}
        {"-"}
        {student.lastname}. {student.firstname[0]}. {student.patronymic[0]}
      </Option>
    ));

  const renderTeacherOptions = () =>
    teachers.map((teacher: ITeacher) => (
      <Option key={teacher.id} value={teacher.id}>
        {teacher.id}
        {"-"}
        {teacher.lastname}. {teacher.firstname[0]}. {teacher.patronymic[0]}
      </Option>
    ));

  const renderGroupOptions = () =>
    groups.map((group: IGroup) => (
      <Option key={group.id} value={group.id}>
        {group.group_name}
      </Option>
    ));

  const groupInfo = (id: string) => {
    const result = groups.find((group) => group.id === id);

    return result?.group_name;
  };

  const handleRangePickerChange = (
    _: RangeValue<Moment>,
    formatString: [string, string]
  ) => onDateChange(formatString);

  const returnData = () => {
    let filtered = [...payments];

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

    if (date[0] === "") {
      filtered = filtered.filter(
        (el: IPayment) =>
          el.payment_date >= startDate() && el.payment_date <= endDate()
      );
    } else {
      filtered = filtered.filter(
        (el: IPayment) =>
          el.payment_date >= date[0] && el.payment_date <= date[1]
      );
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
    <>
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

        <RangePicker onChange={handleRangePickerChange} format={"DD.MM.YYYY"} />

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
          {renderOptionsType()}
        </Select>
      </div>

      <Table columns={columns} dataSource={returnData()} pagination={false} />
    </>
  );
};

export default DetailMode;
