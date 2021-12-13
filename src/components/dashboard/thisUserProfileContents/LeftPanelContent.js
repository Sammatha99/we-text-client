import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingComponent, InputPassword } from "../../utils";
import {
  userNameSchema,
  userEmailSchema,
  updatePasswordSchema,
} from "../../../utils/yupGlobal";
import { ChangeAvatarModal } from "../../modals";

import { thisUserData } from "../../../utils/fakeData";

export default function LeftPanelContent() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(null);
  const [avatarModal, setAvatarModal] = useState(false);

  const {
    register: nameRegister,
    handleSubmit: nameHandleSubmit,
    reset: nameReset,
    formState: { errors: nameErrors },
  } = useForm({
    resolver: yupResolver(userNameSchema),
    defaultValues: { name: "" },
  });

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    reset: emailReset,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(userEmailSchema),
    defaultValues: { email: "" },
  });

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    const getUser = JSON.parse(JSON.stringify(thisUserData));
    nameReset({ name: getUser.name });
    emailReset({ email: getUser.email });

    setUser(getUser);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNameSubmit = (data) => {
    console.log(data);
    setEdit(null);
  };

  const onEmailSubmit = (data) => {
    console.log(data);
    setEdit(null);
  };

  const onPasswordSubmit = (data) => {
    console.log(data);
    setEdit(null);
  };

  const onAvatarSubmit = (avatar) => {
    console.log(avatar);
    setAvatarModal(false);
  };

  const handleCancelBtnClick = (e) => {
    e.preventDefault();
    switch (edit) {
      case "name":
        nameReset({ name: user.name });
        setEdit(null);
        break;
      case "email":
        emailReset({ email: user.email });
        setEdit(null);
        break;
      case "password":
        passwordReset({ password: "", newPassword: "" });
        setEdit(null);
        break;
      default:
        break;
    }
  };

  if (user)
    return (
      <div className="thisUser--panel-left">
        <div className="avatar avatar--big">
          <img src={user.avatar} alt={user.name} />
          <div
            onClick={() => setAvatarModal((prev) => !prev)}
            className="thisUser__camera-icon center"
          >
            <Icon icon="camera" />
          </div>
        </div>
        {avatarModal && (
          <ChangeAvatarModal
            handleSubmit={onAvatarSubmit}
            setShowModal={setAvatarModal}
          />
        )}

        <div className="thisUser__name-wrapper">
          {edit === "name" ? (
            <form
              onSubmit={nameHandleSubmit(onNameSubmit)}
              className="thisUser__input-wrap thisUser__input-wrap--form"
            >
              <textarea
                name="name"
                {...nameRegister("name")}
                className="thisUser__input text--medium text--center"
                type="text"
              />
              {nameErrors.name && (
                <p className="auth__error-message">{nameErrors.name.message}</p>
              )}
              <div className="thisUser__btns-wrap">
                <button type="submit" className="btn btn--primary">
                  Submit
                </button>
                <button onClick={handleCancelBtnClick} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="thisUser__input-wrap">
              <div
                onClick={() => setEdit("name")}
                className="thisUser__input-icon"
              >
                <Icon icon="user" className="thisUser__icon-show" />
                <Icon icon="pen" className="thisUser__icon-pen" />
              </div>
              <textarea
                disabled="disabled"
                readOnly
                className="thisUser__input text--medium text--center"
                type="text"
                value={`${user.name}`}
              />
            </div>
          )}
        </div>
        <div className="thisUser__email-password-wrapper">
          {edit === "email" ? (
            <form
              onSubmit={emailHandleSubmit(onEmailSubmit)}
              className="thisUser__input-wrap thisUser__input-wrap--form"
            >
              <input
                name="email"
                {...emailRegister("email")}
                className="thisUser__input"
                type="text"
              />
              {emailErrors.email && (
                <p className="auth__error-message">
                  {emailErrors.email.message}
                </p>
              )}
              <div className="thisUser__btns-wrap">
                <button type="submit" className="btn btn--primary">
                  Submit
                </button>
                <button onClick={handleCancelBtnClick} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="thisUser__input-wrap">
              <div className="thisUser__input-icon">
                <Icon icon="envelope" className="thisUser__icon-show" />
                <Icon
                  onClick={() => setEdit("email")}
                  icon="pen"
                  className="thisUser__icon-pen"
                />
              </div>
              <input
                disabled="disabled"
                readOnly
                className="thisUser__input"
                type="text"
                value={user.email}
              />
            </div>
          )}
          {edit === "password" ? (
            <form
              onSubmit={passwordHandleSubmit(onPasswordSubmit)}
              className="thisUser__input-wrap thisUser__input-wrap--form"
            >
              <InputPassword
                classes="thisUser__input"
                name="password"
                id="old-password"
                placeholder={"Enter your old password"}
                register={{ ...passwordRegister("password") }}
              />
              {passwordErrors.password && (
                <p className="auth__error-message">
                  {passwordErrors.password.message}
                </p>
              )}
              <InputPassword
                classes="thisUser__input"
                name="newPassword"
                id="new-password"
                placeholder={"Enter your new password"}
                register={{ ...passwordRegister("newPassword") }}
              />
              {passwordErrors.newPassword && (
                <p className="auth__error-message">
                  {passwordErrors.newPassword.message}
                </p>
              )}
              <div className="thisUser__btns-wrap">
                <button type="submit" className="btn btn--primary">
                  Submit
                </button>
                <button onClick={handleCancelBtnClick} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="thisUser__input-wrap">
              <div className="thisUser__input-icon">
                <Icon icon="lock" className="thisUser__icon-show" />
                <Icon
                  onClick={() => setEdit("password")}
                  icon="pen"
                  className="thisUser__icon-pen"
                />
              </div>
              <input
                disabled="disabled"
                readOnly
                className="thisUser__input"
                type="password"
                value="password..."
              />
            </div>
          )}
        </div>
      </div>
    );
  else return LoadingComponent.LoadingThisUserProfileLeftPanel();
}
