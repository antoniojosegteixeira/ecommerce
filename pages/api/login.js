import nc from "next-connect";
import db from "../../utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  let body = req.body;

  // Parsing body data
  if (typeof req.body === "string") {
    body = JSON.parse(req.body);
  }

  await db.connect();
  const user = await User.findOne({ email: body.email }).select("+password");
  await db.disconnect();

  if (user) {
    const passwordsMatch = await bcrypt.compareSync(
      body.password,
      user.password
    );

    if (passwordsMatch) {
      const { _id } = JSON.parse(JSON.stringify(user));
      const token = signToken(_id);

      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(403).send("Invalid password");
    }
  } else {
    res.status(401).send("Invalid user");
  }
});

export default handler;
