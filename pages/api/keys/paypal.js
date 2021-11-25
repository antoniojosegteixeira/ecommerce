import nc from "next-connect";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

export default handler;
