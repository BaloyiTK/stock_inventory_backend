import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60m" });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields!");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("The password must be atleat 6 characters!")
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error(
      "User already exist , please login or use different emaail!"
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60), //60min
    sameSite: "none",
    //secure: true,
  });

  if (user) {
    const { _id, name, email, photo } = user;
    res.status(201).json({ _id, name, email, photo, token });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

export default register;
