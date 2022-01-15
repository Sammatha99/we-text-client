import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { LoadingComponent, swal, catchError, Timer } from "../../utils";
import { schemas, constants } from "../../../utils";
import { thisUserAction } from "../../../features";
import { backendWithoutAuth } from "../../../api/backend";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const thisUser = useSelector((state) => state.thisUser.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.verifyEmailSchema),
  });

  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [timeOut, setTimeOut] = useState(null);

  const handleResendOTP = async () => {
    // handle resend otp
    setTimeOut(null);
    try {
      swal.showLoadingSwal();
      await backendWithoutAuth.post("/auth/send-verification-email", {
        email: thisUser.email,
        id: thisUser.id,
      });
      swal.closeSwal();
      swal.showSuccessSwal("Sent successfully, please check your mailbox");
      setTimeOut(false);
    } catch (err) {
      catchError(err);
    }
    setLoading(false);
  };

  const handleSendOTP = async () => {
    // handle send otp
    setLoading(true);
    try {
      await backendWithoutAuth.post("/auth/send-verification-email", {
        email: thisUser.email,
        id: thisUser.id,
      });
      swal.showSuccessSwal("Sent successfully, please check your mailbox");
      setSended(true);
      setTimeOut(false);
    } catch (err) {
      catchError(err);
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    // handle backend call
    try {
      setTimeOut(null);
      swal.showLoadingSwal();
      await backendWithoutAuth.post("/auth/verify-email", {
        ...data,
        id: thisUser.id,
      });
      swal.closeSwal();
      swal.showSuccessSwal("Verify email successfully");
      dispatch(thisUserAction.verifyEmail(true));
    } catch (err) {
      catchError(err);
    }
  };

  const handleLogout = () => {
    dispatch(thisUserAction.logout());
  };

  const FormOTP = () => (
    <>
      {timeOut === false && (
        <Timer
          startTime={constants.OTPStartTime}
          handleTimeOut={setTimeOut}
          classes="auth__timer"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label className="auth-form__label" htmlFor="verify-email-otp">
          OTP
        </label>
        <input
          name="otp"
          {...register("otp")}
          id="verify-email-otp"
          type="text"
          placeholder="Enter otp here ..."
          disabled={timeOut} // timeOut true => hết thời gian
        />
        {timeOut && (
          <p className="auth__error-message">
            OTP time out, resend to get new one{" "}
          </p>
        )}
        {errors.otp && (
          <p className="auth__error-message">{errors.otp.message}</p>
        )}
        <button
          type="submit"
          className="btn btn--medium btn--primary auth__submit-btn"
        >
          Submit
        </button>
      </form>
      <div onClick={handleResendOTP} className="auth-btns-wrapper">
        <p className="auth-text-link">Resend OTP</p>
      </div>
    </>
  );

  return (
    <div className="auth-background center">
      <div className="auth-wrapper auth-wrapper--small center">
        <p className="text--header text--primary">Verify email</p>
        <p className="text--small">Email: {thisUser.email}</p>
        {loading ? (
          LoadingComponent.LoadingOTPVerifyEmail()
        ) : sended ? (
          FormOTP()
        ) : (
          <button
            onClick={handleSendOTP}
            className="btn btn--medium btn--primary auth__submit-btn"
          >
            Send OTP
          </button>
        )}
        <button
          onClick={handleLogout}
          className="btn btn--medium  auth__submit-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
