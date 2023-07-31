import React, { useEffect } from "react";

import "antd/dist/antd.css";
import MainRouter from "router/MainRouter";

const removeResizeObserverErr = (e) => {
  if (
    e.message ===
    "ResizeObserver loop completed with undelivered notifications."
  ) {
    const resizeObserverErrDiv = document.getElementById(
      "webpack-dev-server-client-overlay-div"
    );
    const resizeObserverErr = document.getElementById(
      "webpack-dev-server-client-overlay"
    );
    resizeObserverErr &&
      resizeObserverErr.setAttribute("style", "display: none");

    resizeObserverErrDiv &&
      resizeObserverErrDiv.setAttribute("style", "display: none");
  }
};

const App = (): JSX.Element => {
  useEffect(() => {
    window.addEventListener("error", (e) => removeResizeObserverErr(e));
    return () => {
      window.removeEventListener("error", removeResizeObserverErr);
    };
  }, []);

  return <MainRouter />;
};

export default App;
