import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../models/Order";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  try {
    await db.connect();
    const newOrder = new Order({
      ...req.body,
      user: req.userId,
    });
    const order = await newOrder.save();

    await db.disconnect();
    res.status(201).send(order);
  } catch (err) {
    console.log(err);
  }
});

export default handler;
