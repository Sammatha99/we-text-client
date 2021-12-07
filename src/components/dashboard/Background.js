import React from "react";

import backgroundImage from "../../assets/imgs/dashboard_background.png";

import "../../style/dashboard.css";

export default function Background() {
  return (
    <div className="background center">
      <img
        className="background__img"
        src={backgroundImage}
        alt="background dashboard"
      />
      <p className="background__header">welcome to wetext</p>
      <p className="background__text">
        Try to search your friend through email or name
      </p>
    </div>
  );
}