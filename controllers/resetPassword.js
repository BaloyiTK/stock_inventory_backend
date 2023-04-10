import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/sendEmail.js";

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.token;


  const verified = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(verified.id);

  if (!user) {
    res.status(400);
    throw new Error("user not found!");
  }

  const { confirmpassword, password } = req.body;

  if (password !== confirmpassword) {

    res.status(400);
    throw new Error("password not matched");
    
  }

  user.password = password
  await user.save()

  sendEmail(undefined, user, undefined);

  
  return  res.status(200).json({ message: "Password reset successful" });

});

export default resetPassword;
