import React, { Fragment, useReducer, useState } from "react";
import "./Signup.css";
const Signup = (props) => {
  const emailReducer = (state, action) => {
    if (action.type === "USER_EMAIL") {
      return {
        valueEmail: action.val,
        emailIsValid: action.val.includes("@"),
      };
    }

    if (action.type === "EMAIL_VALID") {
      return {
        valueEmail: state.valueEmail,
        emailIsValid: state.valueEmail.includes("@"),
      };
    }
    return {
      valueEmail: "",
      emailIsValid: false,
    };
  };

  const passwordReducer = (state, action) => {
    if (action.type === "USER_PASSWORD") {
      return {
        valuePassword: action.val,
        passwordIsValid: action.val.trim().length > 5,
      };
    }
    if (action.type === "PASSWORD_VALID") {
      return {
        valuePassword: state.valuePassword,
        passwordIsValid: state.passwordIsValid,
      };
    }
    return {
      valuePassword: "",
      passwordIsValid: false,
    };
  };

  const confirmPasswordReducer = (state, action) => {
    if (action.type === "CONFIRM_PASSWORD") {
      return {
        valueConfirmPassword: action.val,
        confirmPasswordIsValid: passwordState.valuePassword === action.val,
      };
    }
    if (action.type === "CONFIRM_PASSWORD_VALID") {
      return {
        valueConfirmPassword: state.valueConfirmPassword,
        confirmPasswordIsValid: state.confirmPasswordIsValid,
      };
    }
  };

  const blurReducer = (state, action) => {
    if (action.type === "EMAIL_BLUR") {
      return {
        emailBlur: true,
        passwordBlur: state.passwordBlur,
        confirmPasswordBlur: state.confirmPasswordBlur,
      };
    }

    if (action.type === "PASSWORD_BLUR") {
      return {
        emailBlur: state.emailBlur,
        passwordBlur: true,
        confirmPasswordBlur: state.confirmPasswordBlur,
      };
    }

    if (action.type === "CONFIRM_PASSWORD_BLUR") {
      return {
        emailBlur: state.emailBlur,
        passwordBlur: state.passwordBlur,
        confirmPasswordBlur: true,
      };
    }
    return {
      emailBlur: false,
      passwordBlur: false,
      confirmPasswordBlur: false,
    };
  };

  const [emailState, dispachedEmail] = useReducer(emailReducer, {
    valueEmail: "",
    emailIsValid: false,
  });

  const [passwordState, dispachedPassword] = useReducer(passwordReducer, {
    valuePassword: "",
    passwordIsValid: false,
  });

  const [confirmPasswordState, dispachedConfirmPassword] = useReducer(
    confirmPasswordReducer,
    {
      valueConfirmPassword: "",
      confirmPasswordIsValid: false,
    }
  );

  //dummyStates
  const [name, setName] = useState("Aditya Sinha");
  const [codechefId, setCodechefId] = useState("aditya_621");
  //

  const [blurState, dispachedBlurState] = useReducer(blurReducer, {
    emailBlur: false,
    passwordBlur: false,
    confirmPasswordBlur: false,
  });

  const emailChangeHAndler = (event) => {
    dispachedEmail({ type: "USER_EMAIL", val: event.target.value });
  };

  const ccUnChangeHandler = (event) => {
    // console.log("This one", event.target.value);
    setCodechefId(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailValidator = () => {
    dispachedEmail({ type: "EMAIL_VALID" });
    dispachedBlurState({ type: "EMAIL_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispachedPassword({ type: "USER_PASSWORD", val: event.target.value });
  };

  const passwordValidator = () => {
    dispachedPassword({ type: "PASSWORD_VALID" });
    dispachedBlurState({ type: "PASSWORD_BLUR" });
  };

  const confirmPassword = (event) => {
    dispachedConfirmPassword({
      type: "CONFIRM_PASSWORD",
      val: event.target.value,
    });
  };

  const confirmPasswordValidator = (event) => {
    dispachedConfirmPassword({ type: "CONFIRM_PASSWORD_VALID" });
    dispachedBlurState({ type: "CONFIRM_PASSWORD_BLUR" });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(
      emailState.valueEmail,
      passwordState.valuePassword,
      confirmPasswordState.valueConfirmPassword,
      name,
      codechefId
    );
    props.onSubmit(
      emailState.valueEmail,
      passwordState.valuePassword,
      name,
      codechefId
    );
  };
  return (
    <Fragment>
      <div className="signup">
        <div className="signup_header text-center mb-5 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-file-code-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 1 1 .708-.708z" />
          </svg>
          <h1>Codebasil</h1>
        </div>
        <div className="header_description text-center">
          <h3>Sign Up For Free</h3>
        </div>
        <form className="text-center mb-5" onSubmit={onSubmitHandler}>
          <div className="mt-4 mb-4">
            <div>
              <label className="mb-2 mt-2">What's your email?</label>
            </div>
            <div
              className={
                blurState.emailBlur && !emailState.emailIsValid
                  ? "emailInvalid"
                  : ""
              }
            >
              <input
                placeholder="Enter your email."
                type="email"
                onChange={emailChangeHAndler}
                onBlur={emailValidator}
              ></input>
              {!emailState.emailIsValid && blurState.emailBlur && (
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-exclamation-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>{" "}
                  Enter a valid email
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div>
              <label className="mb-2 mt-2">Password</label>
            </div>
            <div
              className={
                blurState.passwordBlur && !emailState.emailIsValid
                  ? "emailInvalid"
                  : ""
              }
            >
              <input
                placeholder="Create a password of atleast 6 letters/digits."
                onChange={passwordChangeHandler}
                onBlur={passwordValidator}
              ></input>
              {!passwordState.passwordIsValid && blurState.passwordBlur && (
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-exclamation-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>{" "}
                  Password is too short.
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div>
              <label className="mb-2 mt-3">Confirm password</label>
            </div>
            <div
              className={
                blurState.confirmPasswordBlur && !emailState.emailIsValid
                  ? "emailInvalid"
                  : ""
              }
            >
              <input
                placeholder="Confirm password."
                onChange={confirmPassword}
                onBlur={confirmPasswordValidator}
              ></input>
              {!confirmPasswordState.confirmPasswordIsValid &&
                blurState.confirmPasswordBlur && (
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>{" "}
                    password does't match the above password
                  </p>
                )}
            </div>
          </div>
          <div className="mt-4 mb-4">
            <label className="mb-2 mt-3">What should we call you?</label>
            <br />
            <input
              onChange={nameChangeHandler}
              placeholder="Enter a profile name."
              type="text"
              required
            ></input>
          </div>
          <div className="mt-4 mb-4">
            <label className="mb-2 mt-3">HackerRank User Id</label>
            <br />
            <input placeholder="HackerRank user id."></input>
          </div>
          <div className="mt-4 mb-4">
            <label className="mb-2 mt-3">Codeforces User Id</label>
            <br />
            <input placeholder="Codeforces user id."></input>
          </div>
          <div className="mt-4 mb-4">
            <label className="mb-2 mt-3">Codechef User Id</label>
            <br />
            <input
              onChange={ccUnChangeHandler}
              placeholder="Codechef user id."
            ></input>
          </div>
          <button className="mt-3 mb-3" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </Fragment>
  );
};
export default Signup;
