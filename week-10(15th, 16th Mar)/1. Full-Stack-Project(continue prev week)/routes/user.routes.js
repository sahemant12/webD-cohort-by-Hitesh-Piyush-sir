import express from "express";
import { registerUser, verifyUser, login, getMe, logoutUser, forgotPassword, resetPassword } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser)
      .get("/verify/:userToken", verifyUser)
      .post("/login", login)
      .get("/me", isLoggedIn, getMe)
      .post("/logout", isLoggedIn, logoutUser)
      .post("/forgotPassword", forgotPassword)
      .post("/resetPassword/:token", resetPassword)

//userprofile, forgot password, reset password, logout, 
export default router;