import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
        "-password -token -verified"
      );
      return next();
    } catch (error) {
      const errorNew = new Error("Token no valido");
      return res.status(403).json({ msg: errorNew.message });
    }
  }

  if (!token) {
    const error = new Error("Token no valido o inexistente");
    res.status(403).json({ msg: error.message });
  }
  next();
};

export default checkAuth;
