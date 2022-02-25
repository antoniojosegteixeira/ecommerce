import nc from "next-connect";
import db from "../../utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../utils/auth";
import { isAuth } from "../../utils/auth";

const handler = nc();

handler.use(isAuth);

handler.put(async (req, res) => {
  await db.connect();

  // Check if email is taken
  const isEmailTaken = await User.findOne({ email: req.body.email });
  if (isEmailTaken) {
    res.status(409).send("Email already taken");
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.userId },
      {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      },
      {
        returnOriginal: false,
      }
    );
    console.log(updatedUser);

    return res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (err) {
    console.log(err);
  }
});

export default handler;
