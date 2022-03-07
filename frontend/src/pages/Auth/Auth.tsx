import React from "react";
import { navigate } from "hookrouter";
import cls from "classnames";

import s from "./Auth.styl";

const Auth = (): JSX.Element => {
  return (
    <div className={cls(s.container, s.bgRed)}>
      Auth<button onClick={() => navigate("/home")}>to home</button>
    </div>
  );
};

export default Auth;
