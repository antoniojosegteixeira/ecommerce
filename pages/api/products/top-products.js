import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({}).sort({ rating: -1 });
  await db.disconnect();
  res.send(products.slice(0, 3));
});

export default handler;
