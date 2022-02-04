import Navigation from "./navigation/Navigation";
import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import AuthContext from "./Auth-Context/Auth";
import Login from "./Login/Login";
import Signup from "./Sign-Up/Signup";
import { loginAction, signUpAction } from "./actions/userActions";
import Following from "./Following/Following";
import Data from "./Data/Data";
import PasswordReset from "./forgot-password/PasswordReset";

function App() {
  const [personalData, setPersonalData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [following, setFollowing] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("isLoggedIn");
    if (storedLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email, password) => {
    console.log(email, password);
    const afterLoginData = await loginAction(email, password);

    if (afterLoginData.user) {
      setPersonalData(afterLoginData);
      setIsLoggedIn(true);
      setSignUp(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSignUp(false);
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
        {isLoggedIn && !signUp && !forgotPassword && (
          <Header onLogout={logoutHandler} userData={personalData} />
        )}

        {isLoggedIn && !signUp && !forgotPassword && (
          <Following followingClicked={following} userData={personalData} />
        )}
        {isLoggedIn && !signUp && !forgotPassword && <Data />}

        {isLoggedIn && signUp && !forgotPassword && (
          <Signup onSubmit={signupHandler} />
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
