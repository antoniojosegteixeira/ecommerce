import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/,
      "Your password needs at least one special character"
    )
    .matches(/[0-9]/, "Your password needs at least one number")
    .required("Enter a valid password"),
});

export default loginSchema;
