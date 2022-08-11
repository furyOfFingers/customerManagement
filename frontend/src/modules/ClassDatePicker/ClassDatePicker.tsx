import React, { useState } from "react";

import WeekPick from "components/WeekPick";
import { ISchedule } from "interfaces/schedule";
import s from "./ClassDatePicker.styl";

interface IOwnProps {
  onClick?: (data: ISchedule) => void;
}

function ClassDatePicker({ onClick }: IOwnProps): JSX.Element {
  const [pickedDay, setPickedDay] = useState<Array<string>>([]);
  const [pickedDate, setPickedDate] = useState<ISchedule>({});

  const handleDatePick = (date: ISchedule) => {
    const newPickedDate = { ...pickedDate } as ISchedule;

    newPickedDate[Object.keys(date)[0]] = Object.values(date)[0].time;

    setPickedDate(newPickedDate);
    onClick && onClick(newPickedDate);
  };

  const handleDayPick = (day: string) => {
    const newPickedDay = [...pickedDay];

    if (!pickedDay.includes(day)) {
      newPickedDay.push(day);
    } else {
      const newPickedDate = { ...pickedDate };
      delete newPickedDate[day];

      newPickedDay.forEach((el, i) => {
        if (el === day) {
          newPickedDay.splice(i, 1);
        }
      });

      setPickedDate(newPickedDate);
    }

    newPickedDay.sort();
    setPickedDay(newPickedDay);
  };

  return (
    <div className={s.container}>
      <WeekPick
        picked={pickedDay}
        onClickDay={handleDayPick}
        onChangeDate={handleDatePick}
      />
    </div>
  );
}

export default ClassDatePicker;
