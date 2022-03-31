import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useRoutes, navigate } from "hookrouter";
import { isEmpty } from "ramda";

import Auth from "pages/Auth/Auth";
import Home from "pages/Home/Home";
import user from "store/user";

const MainRouter = (): JSX.Element => {
  const isAuth = !isEmpty(toJS(user?.user));

  const authRoutes = {
    "/": () => <Auth />,
    "/home": () => <Home />,
    // '/products': () => <ProductOverview />,
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
