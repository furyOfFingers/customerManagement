import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { navigate } from "hookrouter";
import { isEmpty } from "ramda";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { IAuthSignIn, IAuthSignUp } from "interfaces/auth";
import authStore from "store/auth";
import spinStore from "store/spin";
import userStore from "store/user";
import { SIGNIN, SIGNUP } from "constants/auth";
import s from "./Auth.styl";

const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState(SIGNIN);

  useEffect(() => {
    const isAuth = !isEmpty(userStore?.get());

    isAuth && navigate("/students");
  }, []);

  const handleFormChange = (formName: string) => {
    if (formName === SIGNUP) {
      setIsSignIn(SIGNUP);
    } else {
      setIsSignIn(SIGNIN);
    }
  };

  const onFinish = (formName: string, data: IAuthSignIn | IAuthSignUp) => {
    if (formName === SIGNIN) {
      authStore.signIn(data as IAuthSignIn);
    } else {
      authStore.signUp(data as IAuthSignUp);
    }
  };

  const renderForm = (): JSX.Element =>
    isSignIn === SIGNIN ? (
      <SignIn
        onFinish={onFinish}
        disabled={spinStore.get()}
        onFormChange={handleFormChange}
      />
    ) : (
      <SignUp
        onFinish={onFinish}
        disabled={spinStore.get()}
        onFormChange={handleFormChange}
      />
    );

  return (
    <div className={s.container}>
      <div className={s.formBody}>{renderForm()}</div>
    </div>
  );
};

export default observer(Auth);
