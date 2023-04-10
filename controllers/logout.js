import asyncHandler from "express-async-handler";

const logout = asyncHandler(async (req, res) => {

      res.cookie("token", "", {
          path: "/",
          httpOnly: true,
          expires: new Date(0),
         sameSite: "none",
        //secure: true,
        });

        return res.status(200).json({message: "logged out succsessfully"})
});

export default logout;
