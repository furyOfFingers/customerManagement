import { Button, DatePicker, Table } from "antd";
import React, { useState } from "react";
import moment, { Moment } from "moment";
import { isEmpty } from "ramda";
import { RangeValue } from "rc-picker/lib/interface";

import { ITeacher } from "interfaces/teacher";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import { IPayment } from "interfaces/payment";
import { EnumPayment } from "enums/payment";
import { commonColumns, personalColumns } from "./constants";
import s from "./CommonMode.styl";

const { RangePicker } = DatePicker;

interface IOwnProps {
  students: IStudent[];
  teachers: ITeacher[];
  payments: IPayment[];
  groups: IGroup[];
}

const CommonMode = ({ teachers, payments, groups }: IOwnProps): JSX.Element => {
  const [isRangeData, setIsRangeData] = useState(false);
  const [date, setDate] = useState<[string, string] | string>("");

  const filterByDate = (payments: IPayment[]) => {
    let filtered = [...payments];

    if (isEmpty(date)) {
      const from = moment().startOf("month").format("DD.MM.YYYY");
      const to = moment().endOf("month").format("DD.MM.YYYY");

      filtered = filtered.filter(
        (el: IPayment) => el.payment_date >= from && el.payment_date <= to
      );
    } else {
      filtered = !isRangeData
        ? filtered.filter(
            (el: IPayment) =>
              el.payment_date >= date[0] && el.payment_date <= date[1]
          )
        : filtered.filter((el: IPayment) => el.payment_date === date);
    }
    return filtered;
  };

  const countPaymentMethodCash = (groupId: string) => {
    let cash = 0;

    filterByDate(payments).forEach((payment) => {
      payment.group_id === groupId && payment.method === "cash" && cash++;
    });

    return cash;
  };

  const countPaymentMethodCard = (groupId: string) => {
    let card = 0;

    filterByDate(payments).forEach((payment) => {
      payment.group_id === groupId && payment.method === "card" && card++;
    });

    return card;
  };

  const countCommonSummAmount = (groupId: string) => {
    let sum = 0;

    filterByDate(payments).forEach((payment) => {
      if (payment.group_id === groupId) {
        sum = sum + payment.payment_amount;
      }
    });

    return sum;
  };

  const groupName = (id: string) => {
    const result = groups.find((group) => group.id === id);

    return result!.group_name;
  };

  const teacherName = (id: string) => {
    const { lastname, firstname, patronymic } = teachers.find(
      (item) => item.id === id
    )!;

    return `${lastname} ${firstname[0].toUpperCase()}. ${patronymic[0].toUpperCase()}.`;
  };

  const countAllPayments = (id: string) => {
    let count = 0;

    filterByDate(payments).forEach((payment) => {
      payment.teacher_id === id && count++;
    });

    return count;
  };

  const countOwn = (id: string) => {
    let count = 0;

    filterByDate(payments).forEach((payment) => {
      if (payment.teacher_id === id) {
        count = count + payment.payment_amount - 30;
      }
    });

    return count;
  };

  const countStudio = (id: string) => {
    let count = 0;

    filterByDate(payments).forEach((payment) => {
      if (payment.teacher_id === id) {
        count = count + payment.payment_amount - 60;
      }
    });

    return count;
  };

  const countTrial = (id: string) => {
    let count = 0;

    filterByDate(payments).forEach((payment) => {
      if (
        payment.teacher_id === id &&
        payment.type == String(EnumPayment.Trial)
      ) {
        count = count + payment.payment_amount;
      }
    });

    return count;
  };

  const countPersonalSummAmount = (id: string) => {
    let sum = 0;

    filterByDate(payments).forEach((payment) => {
      if (payment.teacher_id === id) {
        sum = sum + payment.payment_amount;
      }
    });

    return sum;
  };

  const returnCommonData = () =>
    [...groups].map((el) => ({
      key: el.id,
      id: el.id,
      groupName: groupName(el.id!),
      cash: countPaymentMethodCash(el.id!),
      card: countPaymentMethodCard(el.id!),
      sum: countCommonSummAmount(el.id!),
    }));

  const returnPersonalData = () =>
    [...teachers].map((el) => ({
      key: el.id,
      id: el.id,
      teacher: teacherName(el.id!),
      allPayments: countAllPayments(el.id!),
      own: countOwn(el.id!),
      studio: countStudio(el.id!),
      trial: countTrial(el.id!),
      sum: countPersonalSummAmount(el.id!),
    }));

  const handleChangeDataPickerMode = () => {
    setIsRangeData(!isRangeData);
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

  return (
    <div className={s.container}>
      <div className={s.settings}>
        <Button onClick={handleChangeDataPickerMode}>
          {isRangeData ? "range" : "single"}
        </Button>
      </div>

      <div className={s.filters}>
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
      </div>

      <div className={s.tables}>
        <Table
          columns={commonColumns}
          dataSource={returnCommonData()}
          pagination={false}
        />

        <Table
          columns={personalColumns}
          dataSource={returnPersonalData()}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default CommonMode;
