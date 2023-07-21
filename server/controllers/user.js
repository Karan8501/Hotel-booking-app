import User from "../models/User.js";

// get user
export const getUser = async (req, res, next) => {
  try {
    const user = await findById(req, params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// get all users
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// updating user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await findByIdAndUpdate(
      req,
      params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await findByIdAndDelete(req, params.id);
    res.status(200).json({ deleteUser, msg: "user has been delted" });
  } catch (err) {
    next(err);
  }
};
