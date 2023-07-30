import React from "react";
import { Outlet } from "react-router-dom";

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import s from "./Layout.styl";

const Layout = (): JSX.Element => (
  <div className={s.container}>
    <Header />
    <Sidebar />
    <Outlet />
  </div>
);

export default Layout;
