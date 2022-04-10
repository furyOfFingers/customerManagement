import React from "react";
import { observer } from "mobx-react";
import s from "./MoneyReport.styl";

const MoneyReport = (): JSX.Element => {
  return <div className={s.container}>MoneyReport</div>;
};

export default observer(MoneyReport);
