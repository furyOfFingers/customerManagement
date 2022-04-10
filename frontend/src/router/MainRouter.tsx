import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useRoutes, navigate } from "hookrouter";
import { isEmpty } from "ramda";

import Auth from "pages/Auth";
import PageWrapper from "components/PageWrapper";
import Students from "pages/Students";
import Teachers from "pages/Teachers";
import Groups from "pages/Groups";
import Payments from "pages/Payments";
import MoneyReport from "pages/MoneyReport";
import user from "store/user";

const MainRouter = (): JSX.Element => {
  const isAuth = !isEmpty(toJS(user?.user));

  const wrapper = (children: JSX.Element) => (
    <PageWrapper>{children}</PageWrapper>
  );

  const authRoutes = {
    "/": () => <Auth />,
    "/students": () => wrapper(<Students />),
    "/teachers": () => wrapper(<Teachers />),
    "/groups": () => wrapper(<Groups />),
    "/payments": () => wrapper(<Payments />),
    "/moneyReport": () => wrapper(<MoneyReport />),
    // '/products/:id': ({id}) => <ProductDetails id={id} />
  };

  const notAuthRoutes = {
    "/": () => <Auth />,
  };

  const authResult = useRoutes(authRoutes);
  const notAuthResult = useRoutes(notAuthRoutes);

  if (isAuth) {
    return authResult || <div>not found</div>;
  } else {
    navigate("/");
    return notAuthResult;
  }
};

export default observer(MainRouter);
