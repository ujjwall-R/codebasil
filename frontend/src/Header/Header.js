import React, { Fragment, useEffect, useState } from "react";
import "./Header.css";
import Profile from "../assets/aditya.jpg";
import { startSession } from "mongoose";
import { getUserData } from "../actions/userActions";
const Header = (props) => {
  const [style, setStyle] = useState(false);

  const [name, setName] = useState("Loading...");

  const [userData, setUserData] = useState({});
  const [codeChefStar, setCodeChefStar] = useState("Loading...");

  // console.log(props.userData.token);
  useEffect(async () => {
    if (Object.keys(props.userData).length !== 0) {
      setName(props.userData.user.name);
    }
    const data = await getUserData(props.userData.token);
    // console.log("Scr2apped data of loggedIn user", data);

    localStorage.setItem("scrappedCodechefData", JSON.stringify(data));

    props.ccfDataLoader(data);

    setCodeChefStar(data.codechefData.stars);
  }, [codeChefStar]);

  const changeStyle = () => {
    setStyle(!style);
  };

  let stars = [];
  for (let i = 0; i < codeChefStar; i++) {
    stars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        className="bi bi-star-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    );
  }

  return (
    <Fragment>
      <button
        className="mobile-nav-toggle d-xl-none"
        type="button"
        onClick={changeStyle}
      >
        <div className={style ? "toggler-icon open" : "toggler-icon"}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <header id={style ? "mobHeader" : "header"}>
        <div className="d-flex flex-column mt-2">
          <div className="brand text-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              className="bi bi-file-code-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 1 1 .708-.708z" />
            </svg>
            <h3>CODEBASIL</h3>
          </div>
          <img
            src={Profile}
            className="img-fluid rounded-circle mt-4 ms-auto me-auto"
            width="200px"
          />
          <div className="profile">
            <h1 className="text-light text-center mt-2">
              <a href="index.html">{name}</a>
            </h1>
            <div className="mt-2 mb-3">
              <h4 className="text-center mt-5">
                <a href="#">CODECHEF</a>
              </h4>
              <div className="text-light text-center">{stars}</div>

              <h4 className="text-center mt-4">
                <a href="#">CODEFORCES</a>
              </h4>
              <div className="text-light text-center">
                Currently Unavailable
              </div>

              <h4 className="text-center mt-4">
                <a href="#">HACKERRANK</a>
              </h4>
              <div className="text-light text-center">
                Currently Unavailable
              </div>
            </div>
            <div className="logout text-center mt-5 mb-4">
              <button onClick={props.onLogout}>LOG OUT</button>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
export default Header;
