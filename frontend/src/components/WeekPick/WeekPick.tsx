import React from "react";
import cls from "classnames";
import { TimePicker } from "antd";

import { week } from "constants/weekDay";
import s from "./WeekPick.styl";
import moment from "moment";

const format = "HH:mm";

interface IPickedDate {
  [pickedDay: string]: string[];
}

interface IOwnProps {
  pickedDay: string[];
  pickedDate: IPickedDate;
  onClickDay: (pickedDay: string) => void;
  onChangeDate: (date: string[]) => void;
}

function WeekPick({
  onClickDay,
  pickedDay,
  pickedDate,
  onChangeDate,
}: IOwnProps): JSX.Element {
  const handleClick = (day: string) => {
    onClickDay(day);
  };

  const handleSelect = (day: string, timeString: string[]) => {
    onChangeDate([day, ...timeString]);
  };

  const renderBody = () =>
    Object.values(week).map((day) => (
      <div key={day} className={s.pickerContainer}>
        <div
          onClick={() => handleClick(day)}
          className={cls(s.day, { [s.picked]: pickedDay.includes(day) })}
        >
          {day}
        </div>

        {pickedDay.includes(day) &&
          (pickedDate[day]?.[0] && pickedDate[day]?.[1] ? (
            <TimePicker.RangePicker
              defaultValue={[
                moment(pickedDate[day][0], "HH:mm"),
                moment(pickedDate[day][1], "HH:mm"),
              ]}
              format={format}
              className={s.timePicker}
              onChange={(_, timeString) => handleSelect(day, timeString)}
            />
          ) : (
            <TimePicker.RangePicker
              format={format}
              className={s.timePicker}
              onChange={(_, timeString) => handleSelect(day, timeString)}
            />
          ))}
      </div>
    ));

  return <div className={s.container}>{renderBody()} </div>;
}

export default WeekPick;
