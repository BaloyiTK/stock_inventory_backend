import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const user = await User.findById(userId);

  if (user) {
    const { oldpassword, password } = req.body;

    if (!oldpassword || !password) {
      res.status(400);
      throw new Error("Please provide both old password and new password.");
    }

    const passwordMatch = await bcrypt.compare(oldpassword, user.password);

    if (passwordMatch) {
      user.password = password;

      await user.save();
      return res
        .status(200)
        .json({ message: "Your password has been successfully updated." });
    } else {
      return res
        .status(400)
        .json("The old password you entered is incorrect. Please try again.");
    }
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});
export default changePassword;
