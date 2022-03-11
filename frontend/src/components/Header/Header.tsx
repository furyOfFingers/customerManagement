import React from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";

import s from "./Header.styl";
import spin from "store/spin";

function Header() {
  return (
    <div className={s.container}>
      {spin.spin && <Spin size="large" className={s.spin} />}
    </div>
  );
}

export default observer(Header);
