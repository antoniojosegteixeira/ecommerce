import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Enter an email"),
  password: yup
    .string()
    .min(6, "Password too short")
    .matches(
      /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/,
      "Your password needs at least one special character"
    )
    .matches(/[0-9]/, "Your password needs at least a number")
    .required("Enter a valid password"),
});

export default loginSchema;
