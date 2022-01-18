import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../navigation/Navigation.css";

import React, { Fragment, useState } from "react";
const Navigation = (props) => {
  const [following, setFollowing] = useState(false);
  const followingClickHandler = (event) => {
    event.preventDefault();
    setFollowing(!following);
  }
  props.onClickFollowing(following);
  return (
    <Fragment>
      <nav className="navbar fixed-top">
        <ul className="ms-auto me-auto">
          <li className="ms-3 me-3">
            <a href="#">
              <h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  className="bi bi-house-door-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                </svg>{" "}
                Home{" "}
              </h4>
            </a>
          </li>
          <li className="ms-3 me-3 ">
            <a href="#">
              <h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  className="bi bi-file-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
                </svg>{" "}
                About us
              </h4>
            </a>
          </li>
          <li className="ms-3 me-3 d-xl-none">
            <a href="#" onClick={followingClickHandler}>
              <h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-lines-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>{" "}
                Following
              </h4>
            </a>
          </li>
        </ul>

        
      </nav>
    </Fragment>
  );
};
export default Navigation;
