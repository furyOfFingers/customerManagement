import React, { useState } from "react";
import { observer } from "mobx-react";

import s from "./Auth.styl";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { IAuthSignIn, IAuthSignUp } from "interfaces/auth";
import auth from "store/auth";
import spin from "store/spin";
import { AUTH_SIGNIN } from "constants/api";

const Auth = observer((): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState("signIn");

  const handleFormChange = (formName: string) => {
    if (formName === "signUp") {
      setIsSignIn("signUp");
    } else {
      setIsSignIn("signIn");
    }
  };

  const onFinish = (formName: string, data: IAuthSignIn | IAuthSignUp) => {
    if (formName === AUTH_SIGNIN) {
      auth.signIn(data as IAuthSignIn);
    } else {
      auth.signUp(data as IAuthSignUp);
    }
  };

  const renderForm = (): JSX.Element => {
    return isSignIn === "signIn" ? (
      <SignIn
        onFinish={onFinish}
        disabled={spin.spin}
        onFormChange={handleFormChange}
      />
    ) : (
      <SignUp
        onFinish={onFinish}
        disabled={spin.spin}
        onFormChange={handleFormChange}
      />
    );
  };

  return (
    <div className={s.container}>
      <div className={s.formBody}>{renderForm()}</div>
    </div>
  );
});

export default Auth;
