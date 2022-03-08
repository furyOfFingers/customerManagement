import React, { useState } from "react";

import s from "./Auth.styl";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState("signIn");

  const handleFormChange = (formName: string) => {
    if (formName === "signUp") {
      setIsSignIn("signUp");
    } else {
      setIsSignIn("signIn");
    }
  };

  const renderForm = (): JSX.Element => {
    return isSignIn === "signIn" ? (
      <SignIn onFormChange={handleFormChange} />
    ) : (
      <SignUp onFormChange={handleFormChange} />
    );
  };
  return (
    <div className={s.container}>
      <div className={s.formBody}>{renderForm()}</div>
    </div>
  );
};

export default Auth;
