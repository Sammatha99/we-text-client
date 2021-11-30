import React from "react";
import "../../style/loadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loadingScreen loadingScreen--primary-theme">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loadingScreen__text">Just a moment</p>
    </div>
  );
}
