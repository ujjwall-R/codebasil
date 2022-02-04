import "./Modal.css";
import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { otpVarification } from "../actions/userActions";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  console.log(props.verifyEmail);

  const [otp, setOtp] = useState('');

  const onOtpChange = (event) => {
    setOtp(event.target.value);
  }

  const onClickverify = async (event) => {
    props.onModalOverlay();

    const OTPvarification = await otpVarification(props.verifyEmail, otp);
    window.location.reload();
    return;
  }
  return (
    <div className="model">
      <div className="content">
        <p>An otp has been send to the mentioned email address.</p>
       <form className="otp">
         <label className="me-3">OTP</label>
         <input placeholder="OTP" onChange={onOtpChange} type="number"></input>
         <button type="submit" onClick={onClickverify} className="mt-3 py-1 px-4">SIGN UP</button>
       </form>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const emailVerify = props.emailVerify;
  console.log(emailVerify);
  const modalOverlay = () => {
    props.onOtpVerified();
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay onModalOverlay={modalOverlay} verifyEmail={emailVerify} />, portalElement)}
    </Fragment>
  );
};
export default Modal;
