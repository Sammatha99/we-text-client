import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";

import { catchError, swal } from "../../utils";
import { schemas, utilFunction } from "../../../utils";
import { thisUserDetailAction, thisUserAction } from "../../../features";
import { backendWithAuth } from "../../../api/backend";

export default function AboutContent() {
  const dispatch = useDispatch();
  const thisUserDetail = useSelector((state) => state.thisUserDetail.value);
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.userDetailSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const getUserDetail = {
      phoneNumber: thisUserDetail.phoneNumber,
      address: thisUserDetail.address,
      description: thisUserDetail.description,
    };
    reset(getUserDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const onSubmit = async (data) => {
    // remove undifined/null data
    const dataToSend = Object.keys(data)
      .filter((k) => data[k] != null)
      .reduce((a, k) => ({ ...a, [k]: data[k] }), {});

    // only send if dataToSend not empty obj
    if (!utilFunction.isEmltyObject(dataToSend)) {
      try {
        swal.showLoadingSwal();

        const axios = await backendWithAuth();
        if (axios != null) {
          await axios.patch(`/userDetails/${thisUserDetail.id}`, dataToSend);
          dispatch(thisUserDetailAction.update(dataToSend));
        } else {
          dispatch(thisUserAction.logout());
        }

        swal.closeSwal();
        swal.showSuccessSwal();
      } catch (err) {
        catchError(err);
        const getUserDetail = {
          phoneNumber: thisUserDetail.phoneNumber,
          address: thisUserDetail.address,
          description: thisUserDetail.description,
        };
        reset(getUserDetail);
      }
    }
    setEdit(false);
  };

  const handleEditBtnClick = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleCancelBtnClick = (e) => {
    e.preventDefault();
    const getUserDetail = {
      phoneNumber: thisUserDetail.phoneNumber,
      address: thisUserDetail.address,
      description: thisUserDetail.description,
    };
    reset(getUserDetail);
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
        </div>
        {errors.description && (
          <p className="auth__error-message">{errors.description.message}</p>
        )}
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
        </div>
        {errors.phoneNumber && (
          <p className="auth__error-message">{errors.phoneNumber.message}</p>
        )}
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
        </div>
        {errors.address && (
          <p className="auth__error-message">{errors.address.message}</p>
        )}
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
