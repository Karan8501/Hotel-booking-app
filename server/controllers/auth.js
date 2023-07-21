import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// User register process
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    console.log(newUser);
    await newUser.save();

    res.status(200).send("User Has been craeted");
  } catch (err) {
    next(err);
  }
};

// user login process
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not Found"));

    const isPassowrdCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPassowrdCorrect)
      return next(createError(400, "worng password or username"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDteials } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnlt: true,
      })
      .status(200)
      .json({ details: { ...otherDteials }, isAdmin });
  } catch (err) {
    next(err);
  }
};
