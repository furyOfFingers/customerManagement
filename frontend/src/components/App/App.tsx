import React from "react";

import Auth from "pages/Auth/Auth";
import { useRoutes, navigate } from "hookrouter";

function App(): JSX.Element {
  const isAuth = true;
  const routes = {
    "/": () => <Auth />,
    "/home": () => <Home />,
    // '/products': () => <ProductOverview />,
    // '/products/:id': ({id}) => <ProductDetails id={id} />
  };

  const routeResult = useRoutes(routes);

  if (isAuth) {
    return routeResult || <div>not found</div>;
  } else {
    return navigate("/");
  }
}

function Home() {
  return (
    <main>
      <h2>Home</h2>
    </main>
  );
}

export default App;
