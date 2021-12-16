import React from "react";

import { background404image } from "../assets/imgs";

export default function NotFoundPage() {
  return (
    <div className="background center">
      <div
        className="background__image--404"
        style={{ backgroundImage: `url(${background404image})` }}
      ></div>
      <p className="background__header background__header--medium">
        Page not found
      </p>
      <p className="background__text background__text--light">
        The page you're loading for cannot be found
      </p>
      <p className="background__text background__text--link">Back to HOME</p>
    </div>
  );
}
