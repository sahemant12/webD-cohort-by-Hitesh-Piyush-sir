import express from "express";
import { registerUser, verifyUser, login } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser)
      .get("/verify/:userToken", verifyUser)
      .post("/login", login)
//userprofile, forgot password, reset password, logout, 
export default router;