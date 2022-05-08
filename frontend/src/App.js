import Navigation from "./navigation/Navigation";
import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import AuthContext from "./Auth-Context/Auth";
import Login from "./Login/Login";
import Signup from "./Sign-Up/Signup";
import { loginAction, logoutAction, signUpAction } from "./actions/userActions";
import Following from "./Following/Following";
import Data from "./Data/Data";
import { data } from "cheerio/lib/api/attributes";

function App() {
  const [personalData, setPersonalData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [following, setFollowing] = useState(false);

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
      following: ["Loading..."],
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
      localStorage.setItem("userInfo", JSON.stringify(afterLoginData));
      setPersonalData(afterLoginData);
      setIsLoggedIn(true);
      setSignUp(false);
    }
  };

  const directToSignup = () => {
    setIsLoggedIn(true);
    setSignUp(true);
  };

  return (
    <div>
      <AuthContext.Provider value={{ isloggedIn: isLoggedIn }}>
        {!isLoggedIn && !signUp && (
          <Login onLogin={loginHandler} onSignup={directToSignup} />
        )}
        {isLoggedIn && !signUp && (
          <Navigation onClickFollowing={followingClickHandler} />
        )}
        {isLoggedIn && !signUp && (
          <Header
            onLogout={logoutHandler}
            userData={personalData}
            ccfDataLoader={ccfDataLoader}
          />
        )}
        {isLoggedIn && !signUp && (
          <Following
            followingClicked={following}
            followingData={codeChefData.user.following}
          />
        )}
        {isLoggedIn && !signUp && <Data data={codeChefData} />}

        {isLoggedIn && signUp && <Signup onSubmit={signupHandler} />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
