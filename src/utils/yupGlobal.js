import * as yup from "yup";

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/;
const REGEX_ONLY_NUMBER = /^\d+$/;

yup.addMethod(yup.string, "password", function (message) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, "onlyNumber", function (message) {
  return this.matches(REGEX_ONLY_NUMBER, {
    message,
    excludeEmptyString: true,
  });
});

const registerSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup.string().email("Email invalid").required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Min 8 characters")
    .max(16, "Max 16 characters")
    .password("Password must contain at least one letter and one number"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password not match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("email invalid").required("this field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Min 8 characters")
    .max(16, "Max 16 characters")
    .password("Password must contain at least one letter and one number"),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("email invalid").required("this field is required"),
});

const verifyEmailSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6)
    .onlyNumber("This filed only contain numbers")
    .required(),
});

const userDetailSchema = yup.object().shape({
  description: yup.string().max(130, "Max 130 characters"),
  phoneNumber: yup
    .string()
    .test(
      "empty-or-9-characters-check",
      "Password must be at least 9 characters",
      (phoneNumber) => !phoneNumber || phoneNumber.length >= 9
    )
    .onlyNumber("Phonenumber only contain number")
    .max(11, "max 11 characters"),
  address: yup.string().max(100, "Max 100 characters"),
});

const userNameSchema = yup.object().shape({
  name: yup
    .string()
    .required("This field is required")
    .max(36, "Max 36 characters"),
});

const userEmailSchema = yup.object().shape({
  email: yup.string().email("email invalid").required("this field is required"),
});

const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Min 8 characters")
    .max(16, "Max 16 characters")
    .password("Password must contain at least one letter and one number"),
  newPassword: yup
    .string()
    .required("This field is required")
    .min(8, "Min 8 characters")
    .max(16, "Max 16 characters")
    .password("Password must contain at least one letter and one number"),
});

export {
  yup,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  userDetailSchema,
  userNameSchema,
  userEmailSchema,
  updatePasswordSchema,
  verifyEmailSchema,
};
