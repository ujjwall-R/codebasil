import Navigation from "./navigation/Navigation";
import Header from "./Header/Header";
import React, { useState } from "react";
import AuthContext from "./Auth-Context/Auth";
import Login from "./Login/Login";

const DUMMY = {
  name: "Aditya Sinha",
  email: "adityasinha6060@gmail.com",
  password: "aditya",
  codeChefUserName: "abc",
  following: [
    {
      name: "ujjwal raj, husband of tulsi",
    },
  ],
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  }
  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  return (
    <div>
      <AuthContext.Provider value={{ isloggedIn: isLoggedIn }}>
        {!isLoggedIn && <Login onLogin={loginHandler}/>}
        {isLoggedIn && <Navigation/>}
        {isLoggedIn && <Header name={DUMMY.name} onLogout={logoutHandler} />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
