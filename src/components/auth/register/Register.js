import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import googleIcon from "../../../assets/imgs/Google.png";
import "../../../style/auth.css";

import { InputPassword } from "../../utils";
import { registerSchema } from "../../../utils/yupGlobal";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="auth-background center">
      <div className="auth-wrapper center">
        <p className="text--header text--primary">Welcome to WeText</p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <label className="auth-form__label" htmlFor="login-name">
            Username
          </label>
          <input
            {...register("name")}
            id="login-name"
            type="text"
            placeholder="Enter your username here ..."
          />
          {errors.name && (
            <p className="auth__error-message">{errors.name.message}</p>
          )}

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

          <label className="auth-form__label" htmlFor="login-password">
            Password
          </label>
          <InputPassword
            name="password"
            id="login-password"
            register={{ ...register("password") }}
          />
          {errors.password && (
            <p className="auth__error-message">{errors.password.message}</p>
          )}

          <label className="auth-form__label" htmlFor="login-confirm-password">
            Cofirm password
          </label>
          <InputPassword
            name="confirmPassword"
            id="login-confirm-password"
            register={{ ...register("confirmPassword") }}
          />
          {errors.confirmPassword && (
            <p className="auth__error-message">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn--medium btn--primary auth__submit-btn"
          >
            Register
          </button>
        </form>
        <p className="auth__info">
          Already have an account?{" "}
          <span className="auth__info--link">Log in</span>
        </p>
        <p className="auth__info">OR</p>
        <div className="auth__btn-wrapper">
          <button className="btn auth-btn">
            <img className="auth-btn__img" src={googleIcon} alt="google logo" />
            Sign up with Google
          </button>
          <button className="btn auth-btn">
            <Icon
              className="auth-btn__icon"
              icon={["fab", "facebook-square"]}
            />
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
