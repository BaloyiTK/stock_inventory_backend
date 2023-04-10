import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user_id;
  const user = await User.findById(userId);

  if (user) {
    const { _id, name, email, photo } = user;
    return res.status(200).json({ _id, name, email, photo });
  } else {
    res.status(400);
    throw new Error("user not found!");
  }
});
export default getUser;
