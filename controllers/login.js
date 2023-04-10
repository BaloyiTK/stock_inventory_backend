import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../generateToken.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found , please sign up!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  //const token = generateToken(user._id);
  const token = generateToken(user._id)


  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60), //60min
    sameSite: "none",
    //secure: true,
  });
  if (passwordMatch) {
    const { _id, name, email, photo } = user;
    return res.status(200).json({ _id, name, email, photo, token });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password!");
  }
});

export default login;
