import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import "../../../style/auth.css";

import { LoadingComponent } from "../../utils";
import { schemas } from "../../../utils";
import { thisUserAction } from "../../../features";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.verifyEmailSchema),
  });

  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);

  const handleResendOTP = () => {
    setLoading(true);
    // handle resend otp
    setTimeout(() => setLoading(false), 3000);
  };

  const handleSendOTP = () => {
    setLoading(true);
    // handle send otp to email
    setSended(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const onSubmit = (data) => {
    console.log(data);
    // handle backend call
    dispatch(thisUserAction.verifyEmail(true));
  };

  const FormOTP = () => (
    <>
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
        />
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
      </div>
    </div>
  );
}
