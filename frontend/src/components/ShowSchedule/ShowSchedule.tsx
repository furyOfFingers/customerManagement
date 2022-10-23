import React from "react";

import s from "./ShowSchedule.styl";

interface IOwnProps {
  name: string;
  schedule: string[];
}

function ShowSchedule({ schedule, name }: IOwnProps): JSX.Element {
  const renderBody = () =>
    Object.keys(schedule).map((day: string, i) => (
      <div key={i} className={s.date}>
        <div>{day}</div>

        <div className={s.time}>
          <span>{schedule[day][0]}</span> - <span>{schedule[day][1]}</span>
        </div>
      </div>
    ));

  return (
    <div className={s.container}>
      <div className={s.name}>{name}</div>

      <div className={s.dateWrapper}>{renderBody()}</div>
    </div>
  );
}

export default ShowSchedule;
