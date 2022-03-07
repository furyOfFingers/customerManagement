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

  const nottAuthRoutes = {
    "/": () => <Auth />,
  };

  const authResult = useRoutes(authRoutes);
  const notAuthResult = useRoutes(nottAuthRoutes);

  if (isAuth) {
    return authResult || <div>not found</div>;
  } else {
    navigate("/");
    return notAuthResult;
  }
}

function Home() {
  return (
    <main>
      <h2>Home</h2>
      <button onClick={() => navigate("/")}>to auth</button>
    </main>
  );
}

export default App;
