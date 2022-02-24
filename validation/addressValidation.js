import * as yup from "yup";

const required = "Required field";

const loginSchema = yup.object().shape({
  fullName: yup.string().min(4, "Name too short").required(required),
  address: yup.string().min(6, "Address too short").required(required),
  city: yup.string().min(2, "City too short").required(required),
  state: yup.string().required(required),
  postalCode: yup.number().required(required),
});

export default loginSchema;
