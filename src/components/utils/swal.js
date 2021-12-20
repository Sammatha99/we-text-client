import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const showLoadingSwal = () => {
  return MySwal.fire({
    title: "Action in progress..",
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      MySwal.showLoading();
    },
  });
};

const closeSwal = () => MySwal.close();

const showSuccessSwal = (text) => {
  return MySwal.fire({
    title: "Processing complete!",
    icon: "success",
    text,
    // timer: 1000,
    // showConfirmButton: false,
  });
};

const showWarningSwal = (text) => {
  return MySwal.fire({
    title: "Something wrong!",
    icon: "warning",
    text,
  });
};

const showErrorSwal = (text) => {
  return MySwal.fire({
    title: "Failed!",
    icon: "error",
    text,
  });
};

export {
  showLoadingSwal,
  closeSwal,
  showSuccessSwal,
  showWarningSwal,
  showErrorSwal,
};
