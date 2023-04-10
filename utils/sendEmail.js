import nodemailer from "nodemailer";

export const sendEmail = async (token, user, type) => {
  // If no errors occur, send an email to the user
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS, // your email address
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  const resetLink = `${process.env.RESET_PASSWORD_URL}?token=${token}`;
  let currentDate = new Date();

  if (type === "forgot") {
    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Password Reset Request",
      html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <title>Password Reset Request</title>
                </head>
                <body>
                  <p>Dear ${user.name},</p>
          
                  <p>We received a request to reset your password for your account with us. To complete this process, please click on the link below to reset your password:</p>
          
                  <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
          
                  <p>Please note that the link will expire in 1 hour, which is on ${new Date(
                    currentDate.getTime() + 60 * 60 * 1000
                  )}. If you do not reset your password within this time, you may need to request a new link.</p>
          
                  <p>If you did not request a password reset, please ignore this message and contact us immediately if you suspect any unauthorized access to your account.</p>
          
                  <p>Best regards,<br>[Your Company/Website Name]</p>
                </body>
              </html>
            `,
    };

    await transporter.sendMail(message);
  } else {
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
  }
};
