import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";

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

  
    // Send email to the user
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ADDRESS, // your email address
          pass: process.env.EMAIL_PASS, // your email password
        },
      });
  
      const message = {
        from: process.env.EMAIL_ADDRESS, // sender address
        to: user.email, // list of receivers
        subject: "Your Password Has Been Successfully Reset", // Subject line
        text: "Please reset your password using the link below", // plain text body
        html: `<p>Dear ${user.name}, <br/><br/>
  
        This is a confirmation that your password for [Your Application Name] has been successfully reset. If you did not request a password reset, please contact our support team immediately at [Your Support Email].
        
        Date and Time of Reset: [Insert Date and Time]
        
        If you did initiate this password reset, please log in to your account using your new password as soon as possible. We recommend that you change your password again to a unique and secure password that you haven't used before.
        
        If you have any questions or concerns about this password reset, please don't hesitate to contact our support team. We're here to help.
        
        Thank you for choosing [Your Application Name],
        
        [Your Company Name]</p> `, // html body
      };
  
      await transporter.sendMail(message);
  
      res.status(200).json({ message: "Password reset successful" });
us  
});

export default resetPassword;
