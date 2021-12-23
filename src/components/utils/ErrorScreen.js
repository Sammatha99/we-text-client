import { background404image } from "../../assets/imgs";

const ThisUserProfileErrorPage = () => {
  return (
    <div className="thisUser--panel-right center">
      <div
        className="background__image--404"
        style={{ backgroundImage: `url(${background404image})` }}
      ></div>
      <p className="background__header background__header--medium">
        opps, something's wrong
      </p>
      <p className="background__text background__text--light">
        We so sorry, try reloading this page
      </p>
    </div>
  );
};

export { ThisUserProfileErrorPage };
