import React from "react";

import MainRouter from "router/MainRouter";
import s from "./Layout.styl";

const Layout = (): JSX.Element => {
  return (
    <div className={s.container}>
      <MainRouter />
    </div>
  );
};

export default Layout;
