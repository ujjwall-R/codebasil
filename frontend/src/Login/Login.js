import React, { Fragment, useState, useReducer, useEffect } from "react";
import "./Login.css";

const Login = (props) => {
  const [formIsValid, setFormIsVAlid] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return {
        valueEmail: action.val,
        emailIsValid: action.val.includes("@"),
      };
    }
    return {
      valueEmail: "",
      emailIsValid: false,
    };
  };

  const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return {
        valuePassword: action.val,
        passwordIsValid: action.val.trim().length >= 6,
      };
    }
    return {
      valuePassword: "",
      passwordIsValid: false,
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

  const { emailIsValid: eIsValid } = emailState;
  const { passwordIsValid: pIsVaild } = passwordState;

  useEffect(() => {
    const identifer = setTimeout(() => {
      setFormIsVAlid(emailState.emailIsValid && passwordState.passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(identifer);
    };
  }, [eIsValid, pIsVaild]);

  const emailChangeHandler = (event) => {
    dispachedEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispachedPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const onEmailBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const onPasswordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    if (formIsValid) {
      props.onLogin(emailState.valueEmail, passwordState.valuePassword);
      // console.log(emailState.email);
    }
  };

  const onSignupHandler = () => {
    props.onSignup();
  };
  return (
    <Fragment>
      <div className="login">
        <div className="login_header text-center mb-5 mt-3">
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
        <form className="text-center mt-5 pb-5" onSubmit={onSubmitHandler}>
          <div className="formo mt-5 pt-3">
            <div className="continue text-center mb-3">
              <p>To continue, login to Codebasil.</p>
            </div>
            <div className="mb-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <label className="ms-2">Email Id</label>
            </div>

            <div
              className={
                emailIsTouched && !emailState.emailIsValid ? "emailInvalid" : ""
              }
            >
              <input
                type="email"
                placeholder="username"
                onChange={emailChangeHandler}
                onBlur={onEmailBlurHandler}
              ></input>
              {emailIsTouched && !emailState.emailIsValid && (
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
          <div>
            <div className="mt-2 mb-2">
              <label>Password</label>
            </div>
            <div
              className={
                passwordIsTouched && !passwordState.passwordIsValid
                  ? "passwordInvalid"
                  : ""
              }
            >
              <input
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={onPasswordBlurHandler}
              ></input>
              {passwordIsTouched && !passwordState.passwordIsValid && (
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
                  Enter a valid password
                </p>
              )}
            </div>
          </div>
          <button className="mt-3 mb-3" type="submit">
            LOG IN
          </button>
          <br />
          <a href="#">Forgot your password?</a>
        </form>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4 form_border"></div>
          <div className="col-4"></div>
        </div>

        <div className="noAccount text-center mt-5">
          <p>Don't have an account?</p>
          <button
            className="mt-5"
            onClick={
              //move to signup page
              onSignupHandler
            }
          >
            SIGN UP FOR CODEBASIL
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
