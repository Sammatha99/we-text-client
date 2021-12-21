import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { ChangeAvatarModal } from "../../modals";
import { LoadingComponent, InputPassword, swal, catchError } from "../../utils";
import { schemas } from "../../../utils";
import { thisUserAction } from "../../../features";
import { backendWithoutAuth, backendWithAuth } from "../../../api/backend";

export default function LeftPanelContent() {
  const thisUser = useSelector((state) => state.thisUser.value);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const [avatarModal, setAvatarModal] = useState(false);

  const {
    register: nameRegister,
    handleSubmit: nameHandleSubmit,
    reset: nameReset,
    formState: { errors: nameErrors },
  } = useForm({
    resolver: yupResolver(schemas.userNameSchema),
    defaultValues: {
      name: thisUser.name,
    },
  });

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    reset: emailReset,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(schemas.userEmailSchema),
    defaultValues: { email: thisUser.email },
  });

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(schemas.updatePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onNameSubmit = async (data) => {
    try {
      swal.showLoadingSwal();
      const axios = await backendWithAuth();
      if (axios != null) {
        await axios.patch(`/users/${thisUser.id}`, data);
        dispatch(thisUserAction.update(data));
        swal.closeSwal();
        swal.showSuccessSwal();
      } else {
        dispatch(thisUserAction.logout());
        swal.closeSwal();
      }
    } catch (err) {
      catchError(err);
    }
    setEdit(null);
  };

  const onEmailSubmit = async (data) => {
    // TODO 1.2: change email
    try {
      swal.showLoadingSwal();

      const res = await backendWithoutAuth.post(`/auth/update-email`, {
        userId: thisUser.id,
        ...data,
      });
      delete res.data.role;
      dispatch(thisUserAction.update(res.data));

      swal.closeSwal();
      swal.showSuccessSwal();
    } catch (err) {
      catchError(err);
    }
    setEdit(null);
  };

  const onPasswordSubmit = async (data) => {
    try {
      swal.showLoadingSwal();
      Object.assign(data, { id: thisUser.id });
      await backendWithoutAuth.post("/auth/reset-password", data);
      swal.closeSwal();
      swal.showSuccessSwal();
    } catch (err) {
      catchError(err);
    }
    passwordReset({ password: "", newPassword: "" });
    setEdit(null);
  };

  const onAvatarSubmit = async (avatar) => {
    // TODO 1.3 update avatar
    if (avatar == null) return;

    try {
      swal.showLoadingSwal();

      // upload file to firebase
      const type = avatar.url.type.split("/").pop();
      const avatarPath = `userAvatars/${thisUser.id}.${type}`;
      const avatarRef = ref(getStorage(), avatarPath);
      await uploadBytes(avatarRef, avatar.url);

      // get the url after upload
      const url = await getDownloadURL(avatarRef);

      // update user in backend db
      const axios = await backendWithAuth();
      if (axios != null) {
        await axios.patch(`/users/${thisUser.id}`, { avatar: url });
        dispatch(thisUserAction.update({ avatar: url }));
        swal.closeSwal();
        swal.showSuccessSwal();
      } else {
        dispatch(thisUserAction.logout());
        swal.closeSwal();
      }
    } catch (err) {
      catchError(err);
    }
    setAvatarModal(false);
  };

  const handleCancelBtnClick = (e) => {
    e.preventDefault();
    switch (edit) {
      case "name":
        nameReset({ name: thisUser.name });
        setEdit(null);
        break;
      case "email":
        emailReset({ email: thisUser.email });
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

  if (thisUser)
    return (
      <div className="thisUser--panel-left">
        <div className="avatar avatar--big">
          <img src={thisUser.avatar} alt={thisUser.name} />
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
                value={`${thisUser.name}`}
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
                value={thisUser.email}
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
