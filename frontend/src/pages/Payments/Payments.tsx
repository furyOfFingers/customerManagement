import React from "react";
import { observer } from "mobx-react";
import s from "./Payments.styl";

const Payments = (): JSX.Element => {
  return <div className={s.container}>Payments</div>;
};

export default observer(Payments);
