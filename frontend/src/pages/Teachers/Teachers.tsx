import React from "react";
import { observer } from "mobx-react";
import s from "./Teachers.styl";

const Teachers = (): JSX.Element => {
  return <div className={s.container}>Teachers</div>;
};

export default observer(Teachers);
