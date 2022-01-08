import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../navigation/Navigation.css";

import React, { Fragment } from "react";
const Navigation = () => {
  return (
    <Fragment>
       <nav className="navbar">
        <ul className="ms-auto me-auto">
          <li className="ms-5 me-3">
            <a href="#">
              <h4>Home</h4>
            </a>
          </li>
          <li className="ms-3 me-3 ">
            <a href="#">
              <h4>About us</h4>
            </a>
          </li>
          <li className="ms-3 me-3">
            <a href="#">
              <h4>Following</h4>
            </a>
          </li>
        </ul>

        <button className="me-2">LOG OUT</button>
      </nav>
    </Fragment>
  );
};
export default Navigation;
