import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const user = await User.findById(userId).select('-password');

  if (user) {
    const { name,email, photo } = user;

    user.name = req.body.name || name;
    user.email = req.body.email || email;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();

    return res.status(200).json({ updatedUser });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

export default updateUser;
