import express from "express";
import changePassword from "../controllers/changePassword.js";
import forgotPassword from "../controllers/forgotPassword.js";
import getUser from "../controllers/getUser.js";
import login from "../controllers/login.js";
import loginStatus from "../controllers/loginStatus.js";
import logout from "../controllers/logout.js";
import register from "../controllers/register.js";
import resetPassword from "../controllers/resetPassword.js";
import updateUser from "../controllers/updateUser.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

export default router;
