import React from "react";
import { navigate } from "hookrouter";

import s from "./Auth.styl";

const Auth = (): JSX.Element => {
  return (
    <div className={s.container}>
      Auth<button onClick={() => navigate("/home")}>to home</button>
    </div>
  );
};

export default Auth;
