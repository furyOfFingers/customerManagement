import React from "react";

import s from "./PageWrapper.styl";

interface IPageWrapper {
  children: JSX.Element;
}

const PageWrapper = ({ children }: IPageWrapper): JSX.Element => (
  <div className={s.container}>{children}</div>
);

export default PageWrapper;
