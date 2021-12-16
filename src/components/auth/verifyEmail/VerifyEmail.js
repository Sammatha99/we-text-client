import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import "../../../style/auth.css";

import { schemas } from "../../../utils";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.verifyEmailSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  return (
    <div className="auth-background center">
      <div className="auth-wrapper auth-wrapper--small center">
        <p className="text--header text--primary">Verify email</p>
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
        <div className="auth-btns-wrapper">
          <p className="auth-text-link">Resend OTP</p>
          <p className="auth-text-link">Back home</p>
        </div>
      </div>
    </div>
  );
}
