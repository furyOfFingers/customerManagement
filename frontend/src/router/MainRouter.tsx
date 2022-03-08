import React from "react";
import { useRoutes, navigate } from "hookrouter";

import Auth from "pages/Auth/Auth";
import Home from "pages/Home/Home";

const MainRouter = (): JSX.Element => {
  const isAuth = true;
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

export default MainRouter;
