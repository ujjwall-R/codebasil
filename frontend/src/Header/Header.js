import React, { Fragment, useState } from "react";
import "./Header.css";
import Profile from "../assets/aditya.jpg";
import { startSession } from "mongoose";
const Header = (props) => {
  const [style, setStyle] = useState("flase");

  const changeStyle = () => {
    setStyle(!style);
  };

  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        class="bi bi-star-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    );
  }

  return (
    <Fragment>
      <button
        class="mobile-nav-toggle d-xl-none"
        type="button"
        onClick={changeStyle}
      >
        <div class={style ? "toggler-icon" : "toggler-icon open"}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <header id={style ? "header" : "mobHeader"}>
        <div className="d-flex flex-column">
          <img
            src={Profile}
            className="img-fluid rounded-circle mt-4 ms-auto me-auto"
            width="200px"
          />
          <div className="profile">
            <h1 className="text-light text-center mt-3">
              <a href="index.html">{props.name}</a>
            </h1>
            <div className="mt-4 mb-3 pt-1">
              <h3 className="text-center mt-5">
                <a href="#">CODECHEF</a>
              </h3>
              <div className="text-center">{stars}</div>

              <h3 className="text-center mt-5">
                <a href="#">CODEFORCES</a>
              </h3>
              <div className="text-center">{stars}</div>

              <h3 className="text-center mt-5">
                <a href="#">HACKERRANK</a>
              </h3>
              <div className="text-center">{stars}</div>
            </div>
            <div className="logout text-center mt-5">
              <button onClick={props.onLogout}>LOG OUT</button>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
export default Header;
