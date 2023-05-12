import React, { useState } from "react";
import { Moment } from "moment";
import { Table, Select, DatePicker, Button } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import { isEmpty } from "ramda";
import moment from "moment";

import { ITeacher } from "interfaces/teacher";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import { IPayment } from "interfaces/payment";
import { OPTIONS_TYPE } from "pages/Payments/PaymentsForm/constants";
import { columns } from "./constants";
import s from "./DetailMode.styl";

const { RangePicker } = DatePicker;
const { Option } = Select;

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

interface IownProps {
  students: IStudent[];
  teachers: ITeacher[];
  payments: IPayment[];
  groups: IGroup[];
}

const DetailMode = ({
  students,
  teachers,
  payments,
  groups,
}: IownProps): JSX.Element => {
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [method, setMethod] = useState("");
  const [groupId, setGroupId] = useState("");
  const [date, setDate] = useState<[string, string] | string>("");
  const [type, setType] = useState("");
  const [isRangeData, setIsRangeData] = useState(false);

  const handleClearAll = () => {
    setTeacherId("");
    setStudentId("");
    setMethod("");
    setGroupId("");
    setDate("");
    setType("");
  };

  const handleChangeDataPickerMode = () => {
    setDate("");
    setIsRangeData(!isRangeData);
  };

  const studentInfo = (id: string) => {
    const { lastname, firstname, patronymic } = students.find(
      (item) => item.id === id
    )!;

    return `${lastname} ${firstname[0].toUpperCase()}. ${patronymic[0].toUpperCase()}.`;
  };

  const teacherInfo = (id: string) => {
    const { lastname, firstname, patronymic } = teachers.find(
      (item) => item.id === id
    )!;

    return `${lastname} ${firstname[0].toUpperCase()}. ${patronymic[0].toUpperCase()}.`;
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

  const handleDatePickerChange = (_: Moment | null, dateString: string) => {
    setDate(dateString);
  };

  const handleRangePickerChange = (
    _: RangeValue<Moment>,
    formatString: [string, string]
  ) => {
    if (formatString[0] === "") {
      return setDate("");
    }
    setDate(formatString);
  };

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

    if (date) {
      filtered = !isRangeData
        ? filtered.filter(
            (el: IPayment) =>
              el.payment_date >= date[0] && el.payment_date <= date[1]
          )
        : filtered.filter((el: IPayment) => el.payment_date === date);
    }
    if (isEmpty(date)) {
      const from = moment().startOf("month").format("DD.MM.YYYY");
      const to = moment().endOf("month").format("DD.MM.YYYY");

      filtered = filtered.filter(
        (el: IPayment) => el.payment_date >= from && el.payment_date <= to
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
      <div className={s.settings}>
        <Button onClick={handleClearAll}>clear</Button>

        <Button onClick={handleChangeDataPickerMode}>
          {isRangeData ? "range" : "single"}
        </Button>
      </div>

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

        {isRangeData ? (
          <DatePicker
            onChange={handleDatePickerChange}
            placeholder="payment date"
            format={"DD.MM.YYYY"}
          />
        ) : (
          <RangePicker
            onChange={handleRangePickerChange}
            format={"DD.MM.YYYY"}
          />
        )}

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
    </>
  );
};

export default DetailMode;
