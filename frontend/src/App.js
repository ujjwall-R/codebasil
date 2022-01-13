import Navigation from "./navigation/Navigation";
import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import AuthContext from "./Auth-Context/Auth";
import Login from "./Login/Login";
import Signup from "./Sign-Up/Signup";
import { loginAction } from "./actions/userActions";

const DUMMY = {
  name: "Aditya Sinha",
  email: "adityasinha6060@gmail.com",
  password: "aditya",
  codeChefUserName: "abc",
  following: [
    {
      name: "ujjwal raj",
    },
  ],
};

function App() {
  const [personalData, setPersonalData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("isLoggedIn");
    if (storedLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email, password) => {
    console.log(email, password);
    const afterLoginData = await loginAction(email, password);
    console.log(afterLoginData);
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

  const signupHandler = () => {
    setIsLoggedIn(true);
    setSignUp(true);
  };

  const submitHandler = () => {
    setIsLoggedIn(false);
    setSignUp(false);
  };

  return (
    <div>
      <AuthContext.Provider value={{ isloggedIn: isLoggedIn }}>
        {!isLoggedIn && !signUp && (
          <Login onLogin={loginHandler} onSignup={signupHandler} />
        )}
        {isLoggedIn && !signUp && <Navigation />}
        {isLoggedIn && !signUp && (
          <Header
            name={DUMMY.name}
            onLogout={logoutHandler}
            userData={personalData}
          />
        )}
        {isLoggedIn && signUp && <Signup onSubmit={submitHandler} />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
