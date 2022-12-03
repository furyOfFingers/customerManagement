import { Button, Radio, RadioChangeEvent } from "antd";
import cls from "classnames";
// import { isEmpty } from "ramda";
import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";

import { IStudent } from "interfaces/student";
import { VisitList } from "interfaces/visitList";
import s from "./Tab.styl";

const initial = ["0000", "0000"];
const radioButton = ["present", "absent", "sick", "frozen"];
interface IownProps {
  students: IStudent[];
  date: Moment;
  onClick: (day: number) => void;
}
const { Group, Button: RButton } = Radio;

const Tab = ({ students, date, onClick }: IownProps): JSX.Element => {
  // const returnHeader = (date: Moment) => Array(moment(date).daysInMonth());
  // const returnColumn = (days: string[]) =>
  //   students.map((student: IStudent) => ({
  //     key: student.id.toString(),
  //     student: `${student.id} - ${student.lastname} ${student.firstname} ${student.patronymic}`,
  //     days,
  //   }));

  const [day, setDay] = useState<null | string[]>(initial);
  const [isSaveDayButton, setIsSaveDayButton] = useState(false);
  const [isSaveList, setIsSaveList] = useState(false);
  const [header, setHeader] = useState<string[]>();
  const [column, setColumn] = useState<VisitList[]>();

  useEffect(() => {
    const newHeader = [...Array(moment(date).daysInMonth())];

    setHeader(newHeader);
  }, [date]);

  useEffect(() => {
    const newColumn = students.map((student: IStudent) => ({
      key: student.id.toString(),
      student: `${student.id} - ${student.lastname} ${student.firstname} ${student.patronymic}`,
      days: header!,
    }));

    setColumn(newColumn);
  }, [students]);

  const handleConfirmDay = () => {
    setIsSaveDayButton(false);
  };

  const handleSaveList = () => {
    setIsSaveList(false);
  };

  const handleClick = (id: string, day: number) => {
    const newDay = [];
    newDay.push(id);
    newDay.push(day.toString());
    onClick(day + 1);
    setDay(newDay);
    console.log(`id - ${id} / day - ${day}`);
  };

  const handleButtonChange = (event: RadioChangeEvent) => {
    console.log("--> el", event.target.value);
    const newMark = [...column!];
    newMark.forEach((el) => {
      if (day![0] === el.key) {
        // console.log("--> el", el);
        el.days[day![1]] = event.target.value;
      }
    });
    // const newMarks = column?.map((element, i) => {
    //   if (day![0] === element.key) {
    //     console.log("--> i", i);
    //     console.log("--> element", element);
    //     element.days[element.key] = event.target.value;
    //   }
    // });
    // newMark[day![0]].days[day![1]] = event.target.value;
    console.log("--> newMark", newMark);
    // console.log("--> newMarks", newMarks);

    setIsSaveDayButton(true);
    setColumn(newMark);
    setDay(initial);
  };

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>Students</th>

          {header?.map((_, i) => (
            <th key={i}>{i + 1}</th>
          ))}
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
                      onChange={handleButtonChange}
                      defaultValue="a"
                      size="small"
                    >
                      {radioButton.map((el) => (
                        <RButton key={el} value={el}>
                          {el}
                        </RButton>
                      ))}
                    </Group>
                  </td>
                );
              }

              return (
                <td onClick={() => handleClick(data.key, i)} key={i}>
                  {el ? el : i + 1}
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

      <Button
        disabled={!isSaveDayButton}
        type="ghost"
        onClick={handleConfirmDay}
      >
        save action
      </Button>

      <Button disabled={!isSaveList} type="primary" onClick={handleSaveList}>
        save list
      </Button>
    </div>
  );
};

export default Tab;
