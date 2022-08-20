import React from "react";
import cls from "classnames";
import { TimePicker } from "antd";

import s from "./WeekPick.styl";

const week = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const format = "HH:mm";

interface IOwnProps {
  picked: Array<string>;
  onClickDay: (picked: string) => void;
  onChangeDate: (date: string[]) => void;
}

function WeekPick({
  onClickDay,
  picked,
  onChangeDate,
}: IOwnProps): JSX.Element {
  const handleClick = (day: string) => {
    onClickDay(day);
  };

  const handleSelect = (day: string, timeString: string[]) => {
    onChangeDate([day, ...timeString]);
  };

  const renderBody = () => {
    return week.map((day) => {
      return (
        <div key={day} className={s.pickerContainer}>
          <div
            onClick={() => handleClick(day)}
            className={cls(s.day, { [s.picked]: picked.includes(day) })}
          >
            {day}
          </div>

          {picked.includes(day) && (
            <TimePicker.RangePicker
              format={format}
              className={s.timePicker}
              onChange={(_, timeString) => handleSelect(day, timeString)}
            />
          )}
        </div>
      );
    });
  };

  return <div className={s.container}>{renderBody()} </div>;
}

export default WeekPick;
