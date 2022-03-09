import React, { useState } from "react";

import s from "./Auth.styl";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { useHttp } from "hooks/http.hook";
import { IAuthSignIn, IAuthSignUp } from "interfaces/auth";

const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState("signIn");
  const { request } = useHttp();

  const handleFormChange = (formName: string) => {
    if (formName === "signUp") {
      setIsSignIn("signUp");
    } else {
      setIsSignIn("signIn");
    }
  };

  const onFinish = (formName: string, data: IAuthSignIn | IAuthSignUp) => {
    request(`/api/auth/${formName}`, "POST", data).then((res) => {
      console.log("--> res", res);
    });
  };

  const renderForm = (): JSX.Element => {
    return isSignIn === "signIn" ? (
      <SignIn onFormChange={handleFormChange} onFinish={onFinish} />
    ) : (
      <SignUp onFormChange={handleFormChange} onFinish={onFinish} />
    );
  };
  return (
    <div className={s.container}>
      <div className={s.formBody}>{renderForm()}</div>
    </div>
  );
};

export default Auth;
