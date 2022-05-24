import Navigation from "./navigation/Navigation";
import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import AuthContext from "./Auth-Context/Auth";
import Login from "./Login/Login";
import Signup from "./Sign-Up/Signup";
import { loginAction, logoutAction, signUpAction } from "./actions/userActions";
import Following from "./Following/Following";
import Data from "./Data/Data";

import PasswordReset from "./forgot-password/PasswordReset";

import { data } from "cheerio/lib/api/attributes";

function App() {
  const [personalData, setPersonalData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [following, setFollowing] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  // const x = localStorage.getItem("userInfo");

  // if (x) {
  //   console.log(x);
  //   setPersonalData(x);
  //   setIsLoggedIn(true);
  //   setSignUp(false);
  // }

  const loadingData = {
    user: {
      name: "Loading...",
      email: "Loading...",
      codechefUsername: "Loading...",
      following: [],
    },
    codechefData: {
      username: "Loading...",
      profession: "Loading...",
      institution: "Loading....",
      location: "Loading...",
      stars: "Loading...",
      recentActivities: ["Loading..."],
    },
  };

  const [codeChefData, setCodeChefData] = useState(loadingData);

  useEffect(() => {
    const storedLoginInfo = JSON.parse(localStorage.getItem("userInfo"));
    const scrappedCodechefData = JSON.parse(
      localStorage.getItem("scrappedCodechefData")
    );
    // console.log(scrappedCodechefData);
    if (storedLoginInfo) {
      // setIsLoggedIn(true);
      if (scrappedCodechefData.codechefData) {
        setCodeChefData(scrappedCodechefData);
        console.log(scrappedCodechefData);
      }
      setPersonalData(storedLoginInfo);
      setIsLoggedIn(true);
      setSignUp(false);
    }
  }, []);

  const ccfDataLoader = (data) => {
    setCodeChefData(data);
  };

  const loginHandler = async (email, password) => {
    // console.log(email, password);
    const afterLoginData = await loginAction(email, password);

    if (afterLoginData.user) {
      localStorage.setItem("userInfo", JSON.stringify(afterLoginData));
      setPersonalData(afterLoginData);
      setIsLoggedIn(true);
      setSignUp(false);
    }
  };

  const logoutHandler = async () => {
    // console.log("Logout Attempted!");

    const tkn = personalData.token;
    // console.log(tkn);

    const dataLogOut = await logoutAction(tkn);
    console.log(dataLogOut);
    if (dataLogOut.message) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("scrappedCodechefData");
      setIsLoggedIn(false);
      setSignUp(false);
      setCodeChefData(loadingData);
    }
  };

  const followingClickHandler = (set) => {
    setFollowing(set);
  };

  const signupHandler = async (email, password, name, codechefId) => {
    // console.log(email, password, name, codechefId);
    const afterLoginData = await signUpAction(
      email,
      password,
      name,
      codechefId
    );
    console.log(afterLoginData);
    if (afterLoginData.user) {
      setPersonalData(afterLoginData);
      setIsLoggedIn(true);
      setSignUp(true);
    }
  };

  const directToSignup = () => {
    setIsLoggedIn(true);
    setSignUp(true);
  };

  const directToPasswordReset = () => {
    setIsLoggedIn(false);
    setIsLoggedIn(false);
    setForgotPassword(true);
    console.log("hit2");
  };

  return (
    <div>
      <AuthContext.Provider value={{ isloggedIn: isLoggedIn }}>
        {!isLoggedIn && !signUp && !forgotPassword && (
          <Login
            onLogin={loginHandler}
            onSignup={directToSignup}
            onForgotYourPassword={directToPasswordReset}
          />
        )}

        {!isLoggedIn && !signUp && forgotPassword && <PasswordReset />}

        {isLoggedIn && !signUp && !forgotPassword && (
          <Navigation onClickFollowing={followingClickHandler} />
        )}

        {isLoggedIn && !signUp && !forgotPassword &&
          <Header
            onLogout={logoutHandler}
            userData={personalData}
            ccfDataLoader={ccfDataLoader}
          />
        }
        {isLoggedIn && !signUp && !forgotPassword && <Following followingClicked={following} />}
        {isLoggedIn && !signUp && !forgotPassword && <Data data={codeChefData} />}

        {isLoggedIn && signUp && !forgotPassword && (
          <Signup onSubmit={signupHandler} />
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
