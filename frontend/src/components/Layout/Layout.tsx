import React from "react";
import { usePath } from "hookrouter";

import MainRouter from "router/MainRouter";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import s from "./Layout.styl";

const Layout = (): JSX.Element => {
  const path = usePath();

  const renderAuthComponent = () => {
    if (path === "/") {
      return <> </>;
    } else {
      return (
        <>
          <Header />
          <Sidebar />
        </>
      );
    }
  };

  return (
    <div className={s.container}>
      {renderAuthComponent()}

      <MainRouter />
    </div>
  );
};

export default Layout;
