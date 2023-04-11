import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const logout = asyncHandler(async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.json(false);
    }
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id);

    if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.clearCookie(user.id);

      
      return res.status(200).json({message: "logged out succsessfully"})
  
});

export default logout;
