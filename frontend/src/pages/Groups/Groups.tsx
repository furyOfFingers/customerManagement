import React from "react";
import { observer } from "mobx-react";
import s from "./Groups.styl";

const Groups = (): JSX.Element => {
  return <div className={s.container}>Groups</div>;
};

export default observer(Groups);
