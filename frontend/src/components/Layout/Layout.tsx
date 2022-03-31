import React from "react";

import MainRouter from "router/MainRouter";
import Header from "components/Header/Header";
import s from "./Layout.styl";

const Layout = (): JSX.Element => {
  return (
    <div className={s.container}>
      <Header />

      <MainRouter />
    </div>
  );
};

export default Layout;
