import jwt from "jsonwebtoken";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `1d`,
  });
};

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Token invalid" });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token not supplied" });
  }
};
