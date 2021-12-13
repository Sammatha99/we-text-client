import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { userDetailSchema } from "../../../utils/yupGlobal";

import { thisUserDetailData } from "../../../utils/fakeData";

export default function AboutContent() {
  const [edit, setEdit] = useState(false);
  const [userDetail, setUserDetail] = useState({ email: "", firstname: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userDetailSchema),
    defaultValues: userDetail,
  });

  useEffect(() => {
    const getUserDetail = {
      phoneNumber: thisUserDetailData.phoneNumber || "",
      address: thisUserDetailData.address || "",
      description: thisUserDetailData.description || "",
    };
    setUserDetail(getUserDetail);
    reset(getUserDetail);
  }, [reset]);

  const onSubmit = (data) => {
    console.log(data);
    setUserDetail(data);
    setEdit(false);
  };

  const handleEditBtnClick = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleCancelBtnClick = (e) => {
    e.preventDefault();
    reset(userDetail);
    setEdit(false);
  };

  return (
    <div>
      <form
        className={clsx("thisUser__form", {
          "thisUser__form--edit": edit,
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="thisUser__input-wrap">
          <div className="thisUser__input-icon">
            <Icon icon="pen-square" />
          </div>
          <textarea
            name="description"
            {...register("description")}
            rows="3"
            className="thisUser__input"
            type="text"
            placeholder="description ..."
            disabled={!edit}
          />
          {errors.description && (
            <p className="auth__error-message">{errors.description.message}</p>
          )}
        </div>
        <div className="thisUser__input-wrap">
          <div className="thisUser__input-icon">
            <Icon icon="phone-square-alt" />
          </div>
          <input
            name="phoneNumber"
            {...register("phoneNumber")}
            className="thisUser__input"
            type="text"
            placeholder="phone number ..."
            disabled={!edit}
          />
          {errors.phoneNumber && (
            <p className="auth__error-message">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="thisUser__input-wrap">
          <div className="thisUser__input-icon">
            <Icon icon="map-marker-alt" />
          </div>
          <textarea
            name="address"
            {...register("address")}
            rows="3"
            className="thisUser__input"
            type="text"
            placeholder="address ..."
            disabled={!edit}
          />
          {errors.address && (
            <p className="auth__error-message">{errors.address.message}</p>
          )}
        </div>
        <div className="thisUser__btns-wrap">
          <button
            className="btn btn--medium thisUser__btn--edit"
            onClick={handleEditBtnClick}
          >
            Edit
          </button>
          <button
            className="btn btn--medium btn--primary thisUser__btn--submit"
            type="submit"
          >
            Submit
          </button>
          <button
            className="btn btn--medium thisUser__btn--cancel"
            onClick={handleCancelBtnClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
