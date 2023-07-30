import React from "react";

// import Auth from "pages/Auth";
import PageWrapper from "components/PageWrapper";
import Students from "pages/Students";
import Teachers from "pages/Teachers";
import Groups from "pages/Groups";
import Payments from "pages/Payments";
import MoneyReport from "pages/MoneyReport";
import ScheduleList from "pages/ScheduleList";
import Help from "pages/Help";
import VisitList from "pages/VisitList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "components/Layout";

const wrapper = (children: JSX.Element) => (
  <PageWrapper>{children}</PageWrapper>
);

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        path: "students",
        Component: () => wrapper(<Students />),
      },
      {
        path: "teachers",
        Component: () => wrapper(<Teachers />),
      },
      {
        path: "scheduleList",
        Component: () => wrapper(<ScheduleList />),
      },
      {
        path: "visitList",
        Component: () => wrapper(<VisitList />),
      },
      {
        path: "groups",
        Component: () => wrapper(<Groups />),
      },
      {
        path: "payments",
        Component: () => wrapper(<Payments />),
      },
      {
        path: "moneyReport",
        Component: () => wrapper(<MoneyReport />),
      },
      {
        path: "help",
        Component: () => wrapper(<Help />),
      },
    ],
  },
]);

const MainRouter = (): JSX.Element => <RouterProvider router={router} />;

export default MainRouter;
