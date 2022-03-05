import React from "react";

import Auth from "pages/Auth/Auth";
import { useRoutes, navigate } from "hookrouter";

function App(): JSX.Element {
  const isAuth = true;
  const authRoutes = {
    "/": () => <Auth />,
    "/home": () => <Home />,
    // '/products': () => <ProductOverview />,
    // '/products/:id': ({id}) => <ProductDetails id={id} />
  };

  const withoutAuthRoutes = {
    "/": () => <Auth />,
  };

  const authResult = useRoutes(authRoutes);
  const withoutAuthResult = useRoutes(withoutAuthRoutes);

  if (isAuth) {
    return authResult || <div>not found</div>;
  } else {
    navigate("/");
    return withoutAuthResult;
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
