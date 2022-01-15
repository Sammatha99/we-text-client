import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { swal, catchError } from "../../utils";
import { schemas, constants } from "../../../utils";
import { backendWithoutAuth } from "../../../api/backend";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    // handle send new password - backend
    try {
      swal.showLoadingSwal();
      await backendWithoutAuth.post("/auth/forgot-password", data);
      swal.closeSwal();
      swal.showSuccessSwal(
        "New password sent successfully, please check your mailbox"
      );
      handleNavigateLogin();
    } catch (err) {
      catchError(err);
    }
  };

  const handleNavigateLogin = () => {
    navigate(constants.routePath.loginPath, { replace: true });
  };

  return (
    <div className="auth-background center">
      <div className="auth-wrapper center">
        <p className="text--header text--primary">Welcome back to WeText</p>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <label className="auth-form__label" htmlFor="login-email">
            Email
          </label>
          <input
            name="email"
            {...register("email")}
            id="login-email"
            type="text"
            placeholder="Enter your email here ..."
          />
          {errors.email && (
            <p className="auth__error-message">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="btn btn--medium btn--primary auth__submit-btn"
          >
            Send
          </button>
        </form>

        <p className="auth__info">
          Return to{" "}
          <span onClick={handleNavigateLogin} className="auth__info--link">
            Login page
          </span>
        </p>
      </div>
    </div>
  );
}
