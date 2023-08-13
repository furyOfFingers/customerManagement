import { DatePicker, Table } from "antd";
import React from "react";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useTranslation } from "react-i18next";

import { ITeacher } from "interfaces/teacher";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import { IPayment } from "interfaces/payment";
import { IMoneyReportSettings } from "interfaces/moneyReport";
import { EnumPayment } from "enums/payment";
import { commonColumns, personalColumns } from "./constants";
import { startDate, endDate } from "utils/date";
import s from "./CommonMode.styl";

const { RangePicker } = DatePicker;

interface IOwnProps {
  students: IStudent[];
  teachers: ITeacher[];
  payments: IPayment[];
  groups: IGroup[];
  moneyReport: IMoneyReportSettings[] | null;
  date: [string, string];
  onDateChange: (date: [string, string]) => void;
}

const CommonMode = ({
  teachers,
  payments,
  groups,
  moneyReport,
  date,
  onDateChange,
}: IOwnProps): JSX.Element => {
  const { t } = useTranslation();
  const filterByDate = (payments: IPayment[]) => {
    let filtered = [...payments];

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
        sum = sum + Number(payment.payment_amount);
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
        moneyReport?.forEach((report) => {
          if (report.value === payment.type) {
            count = count + Number(report.teacher_salary);
          }
        });
      }
    });

    return count;
  };

  const countStudio = (id: string) => {
    let count = 0;

    filterByDate(payments).forEach((payment) => {
      if (payment.teacher_id === id) {
        moneyReport?.forEach((report) => {
          if (report.value === payment.type) {
            count =
              count +
              (Number(report.subscription_payment) -
                Number(report.teacher_salary));
          }
        });
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
        count = count + Number(payment.payment_amount);
      }
    });

    return count;
  };

  const countPersonalSummAmount = (id: string) => {
    let sum = 0;

    filterByDate(payments).forEach((payment) => {
      if (payment.teacher_id === id) {
        sum = sum + Number(payment.payment_amount);
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

  const handleRangePickerChange = (
    _: RangeValue<Moment>,
    formatString: [string, string]
  ) => onDateChange(formatString);

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <RangePicker onChange={handleRangePickerChange} format={"DD.MM.YYYY"} />
      </div>

      <div className={s.tables}>
        <Table dataSource={returnCommonData()} pagination={false}>
          {Object.keys(commonColumns).map((el) => (
            <Table.Column
              key={commonColumns[el].key}
              title={t(`common.fieldNames.${commonColumns[el].title}`)}
              dataIndex={commonColumns[el].dataIndex}
            />
          ))}
        </Table>

        <Table dataSource={returnPersonalData()} pagination={false}>
          {Object.keys(personalColumns).map((el) => (
            <Table.Column
              key={personalColumns[el].key}
              title={t(`common.fieldNames.${personalColumns[el].title}`)}
              dataIndex={personalColumns[el].dataIndex}
            />
          ))}
        </Table>
      </div>
    </div>
  );
};

export default CommonMode;
