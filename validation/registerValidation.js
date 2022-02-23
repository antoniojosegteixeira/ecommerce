import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup.string().min(2, "Name too short").required("Enter a name"),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm your password"),
});

export default registerSchema;
