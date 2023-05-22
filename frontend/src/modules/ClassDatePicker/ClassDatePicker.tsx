import React, { useState } from "react";

import WeekPick from "components/WeekPick";
import { ISchedule } from "interfaces/schedule";
import { IScheduleList } from "interfaces/scheduleList";

interface IOwnProps {
  picked: IScheduleList | null;
  onClick: (data: ISchedule) => void;
}

function ClassDatePicker({ onClick, picked }: IOwnProps): JSX.Element {
  const [pickedDay, setPickedDay] = useState<string[]>(
    picked?.id ? Object.keys(picked?.schedule) : []
  );
  const [pickedDate, setPickedDate] = useState(
    picked?.id ? picked?.schedule : {}
  );

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
      onClick(newPickedDate);
    }

    newPickedDay.sort();
    setPickedDay(newPickedDay);
  };

  return (
    <WeekPick
      pickedDay={pickedDay}
      pickedDate={pickedDate}
      onClickDay={handleDayPick}
      onChangeDate={handleDatePick}
    />
  );
}

export default ClassDatePicker;
