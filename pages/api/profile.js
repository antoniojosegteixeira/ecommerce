import nc from "next-connect";
import db from "../../utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    await db.disconnect();
    return res.status(403).send({ message: "User already exists" });
  }
  const newUser = await new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });

  const createdUser = newUser.save();
  await db.disconnect();
  const token = signToken(createdUser._id);

  return res.send({
    token,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

export default handler;
