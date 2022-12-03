import React from "react";
import { observer } from "mobx-react";
import { useRoutes, navigate } from "hookrouter";
import { isEmpty } from "ramda";

import Auth from "pages/Auth";
import PageWrapper from "components/PageWrapper";
import Students from "pages/Students";
import Teachers from "pages/Teachers";
import Groups from "pages/Groups";
import Payments from "pages/Payments";
import MoneyReport from "pages/MoneyReport";
import ScheduleList from "pages/ScheduleList";
import Help from "pages/Help";
import VisitList from "pages/VisitList";
import userStore from "store/user";

import s from "./MainRouter.styl";

const MainRouter = (): JSX.Element => {
  const isAuth = !isEmpty(userStore.get()?.user);

  const wrapper = (children: JSX.Element) => (
    <PageWrapper>{children}</PageWrapper>
  );

  const authRoutes = {
    "/": () => <Auth />,
    "/students": () => wrapper(<Students />),
    "/teachers": () => wrapper(<Teachers />),
    "/scheduleList": () => wrapper(<ScheduleList />),
    "/visitList": () => wrapper(<VisitList />),
    "/groups": () => wrapper(<Groups />),
    "/payments": () => wrapper(<Payments />),
    "/moneyReport": () => wrapper(<MoneyReport />),
    "/help": () => wrapper(<Help />),
    // '/products/:id': ({id}) => <ProductDetails id={id} />
  };

  const notAuthRoutes = {
    "/": () => <Auth />,
  };

  const authResult = useRoutes(authRoutes);
  const notAuthResult = useRoutes(notAuthRoutes);

  if (isAuth) {
    return authResult || <div className={s.container}>not found</div>;
  } else {
    navigate("/");
    return notAuthResult;
  }
};

export default observer(MainRouter);
