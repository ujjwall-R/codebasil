import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    // console.log(req.header);
    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decoded = jwt.verify(token, "codebasil");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please Authenticate" });
  }
};

export { auth };
