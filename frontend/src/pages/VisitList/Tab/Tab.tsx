import { Button, Radio, RadioChangeEvent } from "antd";
import cls from "classnames";
import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";

import { IStudent } from "interfaces/student";
import { IColumnVisitList, TVisitListStudents } from "interfaces/visitList";
import s from "./Tab.styl";

const initial = ["0000", "0000"];
const radioButton = ["present", "absent", "sick", "frozen", "-"];

interface IownProps {
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
  visitList,
  groupId,
}: IownProps): JSX.Element => {
  const [day, setDay] = useState<string[]>(initial);
  const [isChanges, setIsChanges] = useState(false);
  const [header, setHeader] = useState<string[]>();
  const [column, setColumn] = useState<IColumnVisitList[]>();

  useEffect(() => {
    const newHeader = [...Array(moment(date).daysInMonth())];

    setHeader(newHeader);
  }, [date]);

  const initialColumn = () => {
    const newColumn = students.map((student: IStudent) => {
      const filteredStudent = visitList?.[student.id];
      const days = header?.map((day, i) =>
        filteredStudent?.[i + 1] ? filteredStudent?.[i + 1] : day
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
          <th>Students</th>

          {header?.map((_, i) => {
            const holiday =
              moment(`2023-05-${i + 1}`).day() === 0 ||
              moment(`2023-05-${i + 1}`).day() === 6;

            return (
              <th key={i}>
                <div className={cls(s.headWrap, { [s.holiday]: holiday })}>
                  <span>
                    {moment(`2023-05-${i + 1}`)
                      .locale("ru")
                      .format("dddd")
                      .substring(0, 2)}
                  </span>

                  <span>{i + 1}</span>
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
        save
      </Button>

      <Button disabled={!isChanges} onClick={handleDecline}>
        cancel
      </Button>
    </div>
  );
};

export default Tab;
