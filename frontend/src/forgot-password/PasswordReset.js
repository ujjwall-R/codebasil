import React, { Fragment, useState } from "react";
import { resetPassword } from "../actions/userActions";
import "./PasswordReset.css";
const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onResetPassword = async () => {
    const resetHandler = await resetPassword(email, password);
  };
  return (
    <Fragment>
      <div className="reset">
        <div className="reset_header text-center mb-5 pt-3 pb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#fff"
            className="bi bi-file-code-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 1 1 .708-.708z" />
          </svg>
          <h1>CodeBasil</h1>
        </div>
      </div>
      <div className="text-center mt-5 mb-5 password">
        <h1>Password Reset</h1>
        <p className="mt-3">
          Enter your <strong>email address</strong> that you used to register in
          CodeBasil. We'll send you an <strong>OTP</strong> on your email with
          your username for varification.
        </p>
      </div>
      <div className="password_reset text-center">
        <form onSubmit={onResetPassword}>
          <label className="mb-1">Email</label>
          <input
            type="email"
            placeholder="EMAIL"
            onChange={onEmailChange}
          ></input>
          <label className="mb-1">New Password</label>
          <input
            type="string"
            placeholder="Password"
            onChange={onPasswordChange}
          ></input>
          <button className="mt-4" type="submit">
            SEND
          </button>
        </form>
      </div>
    </Fragment>
  );
};
export default PasswordReset;
