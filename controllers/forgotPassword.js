import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../generateToken.js";

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("user not found!");
  }

  const token = generateToken(user._id);

  const type = "forgot";

  sendEmail(token, user, type);

  return res.status(200).json({
    message:
      "Password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.",
  });
});

export default forgotPassword;
