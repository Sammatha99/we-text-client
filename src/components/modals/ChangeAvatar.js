import React, { useState, useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { imageType } from "../../utils/constants";

export default function ChangeAvatar({ handleSubmit, setShowModal }) {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      setAvatar(null);
    };
  }, []);

  useEffect(() => {
    if (!avatar || !avatar.url) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(avatar.url);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [avatar]);

  const onChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file && imageType.includes(file.type)) {
      setAvatar({ url: e.target.files[0] });
    } else {
      setAvatar({ error: `File must be: ${imageType.join(", ")}` });
    }
    e.target.value = null;
  };

  return (
    <>
      <label
        onClick={() => setShowModal((prev) => !prev)}
        className="modal-overlay center"
      ></label>
      <div className="modal-wrapper">
        <div className="modal__header">
          Select new avatar
          <label
            onClick={() => setShowModal((prev) => !prev)}
            className="modal__close-icon"
          >
            <Icon icon="times" />
          </label>
        </div>
        <div className="modal__body">
          {preview && (
            <div className="modal__image-wrapper center">
              <div
                alt="not found"
                className="modal__image-preview"
                style={{ backgroundImage: `url(${preview})` }}
              ></div>
            </div>
          )}
          <div className="modal__image-btns">
            <input
              className="modal__image-input"
              type="file"
              onChange={onChangeAvatar}
            />
            {preview && (
              <>
                <button
                  className=" btn modal__remove-image"
                  onClick={() => setAvatar(null)}
                >
                  Remove
                </button>
                <button
                  className="btn btn--primary modal__remove-image"
                  onClick={() => handleSubmit(avatar)}
                >
                  Submit
                </button>
              </>
            )}
          </div>
          {avatar && avatar.error && (
            <p className="auth__error-message">{avatar.error}</p>
          )}
        </div>
      </div>
    </>
  );
}
