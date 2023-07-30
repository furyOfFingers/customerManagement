import { Button, Radio, RadioChangeEvent } from "antd";
import cls from "classnames";
import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";

import { week } from "constants/weekDay";
import { IStudent } from "interfaces/student";
import { IScheduleList } from "interfaces/scheduleList";
import { IColumnVisitList, TVisitListStudents } from "interfaces/visitList";
import s from "./Tab.styl";

const initial = ["0000", "0000"];
const radioButton = ["present", "absent", "sick", "frozen", "-"];

interface IownProps {
  scheduleList: IScheduleList;
  students: IStudent[];
  visitList: TVisitListStudents;
  groupId: string | undefined;
  date: Moment;
  onSubmit: (column: IColumnVisitList[], groupId: string) => void;
}
const { Group, Button: RButton } = Radio;

const Tab = ({
  students,
  date,
  onSubmit,
  scheduleList,
  visitList,
  groupId,
}: IownProps): JSX.Element => {
  const { t } = useTranslation();
  const [day, setDay] = useState<string[]>(initial);
  const [isChanges, setIsChanges] = useState(false);
  const [header, setHeader] = useState<string[]>();
  const [column, setColumn] = useState<IColumnVisitList[]>();

  useEffect(() => {
    let daysInMonth = moment(date).daysInMonth();

    const firstWeek = Object.values(week).slice(
      moment(date).startOf("month").day() - 1
    );
    const monthDays: string[] = [];

    while (daysInMonth > 0) {
      if (monthDays.length < 1) {
        firstWeek.forEach((el) => {
          monthDays.push(el);
          daysInMonth--;
        });
      } else {
        Object.values(week).forEach((el) => {
          if (daysInMonth < 1) {
            return;
          }
          monthDays.push(el);
          daysInMonth--;
        });
      }
    }

    setHeader(monthDays);
  }, [date]);

  const initialColumn = () => {
    const newColumn = students.map((student: IStudent) => {
      const filteredStudent = visitList?.[student.id];
      const days = header?.map((_, i) =>
        // На be применяется replace по "."
        filteredStudent?.[i + 1] ? filteredStudent?.[i + 1] : "."
      );

      return {
        key: student.id.toString(),
        student: `${student.id} - ${student.lastname} ${student.firstname} ${student.patronymic}`,
        days,
      };
    });

    setColumn(newColumn);
  };

  useEffect(() => {
    initialColumn();
  }, [students, header]);

  const handleSubmit = () => {
    onSubmit(column!, groupId!);
    setIsChanges(false);
  };

  const handleDecline = () => {
    setIsChanges(false);
    initialColumn();
  };

  const handleDayClick = (id: string, day: number) => {
    const newDay = [];
    newDay.push(id);
    newDay.push(day.toString());
    setDay(newDay);
  };

  const handleTypePicker = (event: RadioChangeEvent) => {
    const newMark = [...column!];

    newMark.forEach((el) => {
      if (day![0] === el.key) {
        el.days![day![1]] = event.target.value;
      }
    });

    setIsChanges(true);
    setColumn(newMark);
    setDay(initial);
  };

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>{t("sidebar.students")}</th>

          {header?.map((el, i) => {
            const scheduleDay = scheduleList?.schedule[el];

            return (
              <th key={i}>
                <div className={cls(s.headWrap, { [s.holiday]: scheduleDay })}>
                  {/* слайсится по первым 2 символам и в случае увеличения символов нужно изменять locale */}
                  <span>{t(`visitList.weekDays.${el.substring(0, 2)}`)}</span>
                  <span>{i + 1}</span>

                  {scheduleDay && (
                    <>
                      <span>{scheduleDay[0]}</span>
                      <span>{scheduleDay[1]}</span>
                    </>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {column?.map((data) => (
          <tr key={data.key}>
            <td>{data.student}</td>

            {data.days?.map((el, i) => {
              const picked = day![0] === data.key && day![1] == i.toString();

              if (picked) {
                return (
                  <td key={i} className={cls({ [s.unpicked]: picked })}>
                    <Group
                      onChange={handleTypePicker}
                      defaultValue="a"
                      size="small"
                    >
                      {radioButton.map((el) => (
                        <RButton key={`${el}${i}`} value={el}>
                          {el}
                        </RButton>
                      ))}
                    </Group>
                  </td>
                );
              }

              return (
                <td
                  key={`${data.key}${i}`}
                  onClick={() => handleDayClick(data.key, i)}
                >
                  {el ? el : "-"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={s.container}>
      {renderTable()}

      <Button type="primary" disabled={!isChanges} onClick={handleSubmit}>
        {t("common.panelControl.update")}
      </Button>

      <Button disabled={!isChanges} onClick={handleDecline}>
        {t("common.panelControl.cancel")}
      </Button>
    </div>
  );
};

export default Tab;
