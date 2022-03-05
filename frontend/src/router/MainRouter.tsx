import React, { FC } from "react";
import { Route, Routes, Link } from "react-router-dom";
// import AuthForm from "pages/AuthForm/AuthForm";
// import WrongUrl from "pages/WrongUrl/WrongUrl";
// import { useSelector } from "react-redux";
import Auth from "pages/Auth/Auth";
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

const MainRouter = (): JSX.Element => {
  // const token: string = useSelector((state: IAppState) => state?.token?.token);

  return (
    <Routes>
      <Route path="/" element={() => <Auth />} />
      <Route path="about" element={() => <About />} />
    </Routes>
  );
};

export default MainRouter;
