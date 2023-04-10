import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.token;

  let verified;
  try {
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(verified.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const { confirmpassword, password } = req.body;

  if (!password || !confirmpassword) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  if (password !== confirmpassword) {
    res.status(400);
    throw new Error("Passwords do not match. Please try again");
  }

  user.password = password;
  await user.save();

  sendEmail(undefined, user, undefined);

  return res.status(200).json({ message: "Password reset successful" });
});

export default resetPassword;
