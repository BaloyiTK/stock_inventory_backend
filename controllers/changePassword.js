import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const user = await User.findById(userId);

  if (user) {
    //const oldPassword = user.password

    const { oldpassword, password } = req.body;

    const passwordMatch = await bcrypt.compare(oldpassword, user.password);

    if (passwordMatch) {
      user.password = password;

      await user.save();
      return res.status(200).json("password updated");
    } else {
      return res.status(400).json("old passsword wrong");
    }
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});
export default changePassword;
