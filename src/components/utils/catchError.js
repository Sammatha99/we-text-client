import { swal } from "./index";

const catchError = (err) => {
  if (err.response) {
    swal.showErrorSwal(err.response.data.message);
  } else if (err.request) {
    swal.showErrorSwal(err);
  } else {
    swal.showErrorSwal(err.message);
  }
};

export default catchError;
