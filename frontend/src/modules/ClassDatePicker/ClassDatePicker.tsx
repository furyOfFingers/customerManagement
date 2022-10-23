import React, { useState } from "react";

import WeekPick from "components/WeekPick";
import { ISchedule } from "interfaces/schedule";

interface IOwnProps {
  onClick: (data: ISchedule) => void;
}

function ClassDatePicker({ onClick }: IOwnProps): JSX.Element {
  const [pickedDay, setPickedDay] = useState<string[]>([]);
  const [pickedDate, setPickedDate] = useState({});

  const handleDatePick = (date: string[]) => {
    const newPickedDate = { ...pickedDate } as ISchedule;

    newPickedDate[date[0]] = [date[1], date[2]];

    setPickedDate(newPickedDate);
    onClick(newPickedDate);
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
    <div>
      <WeekPick
        picked={pickedDay}
        onClickDay={handleDayPick}
        onChangeDate={handleDatePick}
      />
    </div>
  );
}

export default ClassDatePicker;
