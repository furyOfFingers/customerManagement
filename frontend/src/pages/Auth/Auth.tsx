import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { navigate } from "hookrouter";
import { isEmpty } from "ramda";

import s from "./Auth.styl";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { IAuthSignIn, IAuthSignUp } from "interfaces/auth";
import auth from "store/auth";
import spin from "store/spin";
import user from "store/user";
import { SIGNIN, SIGNUP } from "constants/auth";

const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState(SIGNIN);

  useEffect(() => {
    const isAuth = !isEmpty(toJS(user?.user));

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
      auth.signIn(data as IAuthSignIn);
    } else {
      auth.signUp(data as IAuthSignUp);
    }
  };

  const renderForm = (): JSX.Element => {
    return isSignIn === SIGNIN ? (
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
};

export default observer(Auth);
